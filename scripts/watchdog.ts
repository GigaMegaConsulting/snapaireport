#!/usr/bin/env tsx
/**
 * SnapReport watchdog — runs alongside the queue worker via launchd.
 *
 * Checks once per hour: is anything stuck?
 *   - Any submission in pending/ older than 30 min → ping Slack
 *   - Worker hasn't logged activity in 2h while pending exists → ping Slack
 *
 * Stays quiet on the happy path (empty queue, recent activity). Only fires
 * when something needs attention so it doesn't become noise.
 */

import { execSync } from "node:child_process";
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const QUEUE_DIR =
  process.env.QUEUE_DIR ??
  "/Users/samagentbot/.openclaw/workspace/data/snapaireport-queue";
const WORKER_LOG = process.env.SNAPAIREPORT_WORKER_LOG ?? "/tmp/snapaireport-worker.log";
const STATE_FILE = "/tmp/snapaireport-watchdog-state.json";

const STUCK_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes
const SILENCE_THRESHOLD_MS = 2 * 60 * 60 * 1000; // 2 hours
const ALERT_COOLDOWN_MS = 4 * 60 * 60 * 1000; // re-alert at most every 4h per kind

interface State {
  lastAlert: Record<string, number>; // alert kind → unix ms
}

function loadState(): State {
  try {
    return JSON.parse(readFileSync(STATE_FILE, "utf8")) as State;
  } catch {
    return { lastAlert: {} };
  }
}

function saveState(s: State) {
  writeFileSync(STATE_FILE, JSON.stringify(s, null, 2));
}

function notifySlack(message: string) {
  const target = process.env.SNAPAIREPORT_SLACK_TARGET ?? "#snapaireport";
  try {
    execSync(
      `openclaw message send --channel slack --target ${JSON.stringify(target)} --message ${JSON.stringify(message)}`,
      { stdio: "pipe" },
    );
  } catch (err) {
    console.error("watchdog: slack notify failed", (err as Error).message.slice(0, 200));
  }
}

function alertOnce(state: State, kind: string, message: string) {
  const now = Date.now();
  const last = state.lastAlert[kind] ?? 0;
  if (now - last < ALERT_COOLDOWN_MS) {
    console.log(`watchdog: ${kind} suppressed (cooldown)`);
    return;
  }
  notifySlack(message);
  state.lastAlert[kind] = now;
  saveState(state);
}

function findStuckPending(): { id: string; ageMinutes: number }[] {
  const dir = path.join(QUEUE_DIR, "pending");
  if (!existsSync(dir)) return [];

  const now = Date.now();
  const stuck: { id: string; ageMinutes: number }[] = [];

  for (const name of readdirSync(dir)) {
    if (name === "README.md") continue;

    const full = path.join(dir, name);
    let mtimeMs: number;
    try {
      mtimeMs = statSync(full).mtimeMs;
    } catch {
      continue;
    }

    const age = now - mtimeMs;
    if (age > STUCK_THRESHOLD_MS) {
      stuck.push({
        id: name.replace(/\.json$/, ""),
        ageMinutes: Math.floor(age / 60000),
      });
    }
  }

  return stuck;
}

function workerSilentMs(): number | null {
  if (!existsSync(WORKER_LOG)) return null;
  try {
    return Date.now() - statSync(WORKER_LOG).mtimeMs;
  } catch {
    return null;
  }
}

function main() {
  const state = loadState();
  const stuck = findStuckPending();
  const silent = workerSilentMs();

  // Stuck pending submissions
  if (stuck.length > 0) {
    const oldestMin = Math.max(...stuck.map((s) => s.ageMinutes));
    alertOnce(
      state,
      "stuck-pending",
      `:rotating_light: SnapReport watchdog — ${stuck.length} submission(s) stuck in pending/ for ${oldestMin}+ min. Worker may be down, rate-limited, or stuck. Check \`/tmp/snapaireport-worker.log\` on the Mac mini.`,
    );
  }

  // Worker silent + queue not empty
  if (silent !== null && silent > SILENCE_THRESHOLD_MS && stuck.length > 0) {
    alertOnce(
      state,
      "worker-silent",
      `:warning: SnapReport worker has not logged anything for ${Math.floor(silent / 60000)} min, and the queue has pending items. LaunchAgent might be dead — run \`launchctl list | grep snapaireport\` to check.`,
    );
  }

  console.log(
    `watchdog: stuck=${stuck.length} silentMin=${
      silent === null ? "n/a" : Math.floor(silent / 60000)
    }`,
  );
}

main();
