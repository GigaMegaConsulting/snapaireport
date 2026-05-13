import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { randomUUID } from 'crypto';
import type { Assessment } from '../types/report';

/**
 * Lightweight on-disk store for submissions.
 *
 * Storage location:
 *   - Vercel (or any read-only-FS host): /tmp/snapaireport-assessments
 *     (ephemeral, cleared between invocations — fine for transient logging)
 *   - Local / writable env: data/assessments/ in the project root
 *
 * Storage failures are NEVER fatal — the report generation pipeline
 * runs regardless. We log and continue. The email + PDF is the
 * deliverable; persistence is best-effort until we move to Vercel Blob
 * or a proper database.
 */
const PROJECT_DIR = path.join(process.cwd(), 'data', 'assessments');
const TMP_DIR = path.join(os.tmpdir(), 'snapaireport-assessments');

// Try project dir first; on EROFS or EACCES fall back to /tmp.
let DATA_DIR = PROJECT_DIR;
let DATA_DIR_RESOLVED = false;

async function ensureDir(): Promise<void> {
  if (!DATA_DIR_RESOLVED) {
    try {
      await fs.mkdir(PROJECT_DIR, { recursive: true });
      DATA_DIR = PROJECT_DIR;
    } catch {
      try {
        await fs.mkdir(TMP_DIR, { recursive: true });
        DATA_DIR = TMP_DIR;
      } catch (err) {
        // Both failed. Storage is a no-op for this process.
        console.warn('[storage] no writable directory for submissions:', err);
      }
    }
    DATA_DIR_RESOLVED = true;
  }
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

/**
 * Persist a submission. Returns the constructed Assessment even if the
 * write fails — caller can still proceed with report generation using
 * the returned object's fields.
 */
export async function createAssessment(
  input: Omit<Assessment, 'id' | 'status' | 'createdAt' | 'updatedAt'> &
    Partial<Pick<Assessment, 'status'>>,
): Promise<Assessment> {
  const now = new Date().toISOString();
  const assessment: Assessment = {
    id: randomUUID(),
    status: 'transcript_received',
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  try {
    await ensureDir();
    await fs.writeFile(filePath(assessment.id), JSON.stringify(assessment, null, 2), 'utf8');
  } catch (err) {
    console.warn(`[storage] createAssessment write failed for ${assessment.id}:`, err);
  }
  return assessment;
}

export async function getAssessment(id: string): Promise<Assessment | null> {
  try {
    await ensureDir();
    const raw = await fs.readFile(filePath(id), 'utf8');
    return JSON.parse(raw) as Assessment;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    console.warn(`[storage] getAssessment read failed for ${id}:`, err);
    return null;
  }
}

/**
 * Patch an existing assessment. If the original isn't readable (e.g.
 * different lambda instance, /tmp wiped), we still log the intent but
 * don't surface an error to the caller — the pipeline keeps going.
 */
export async function updateAssessment(
  id: string,
  patch: Partial<Omit<Assessment, 'id' | 'createdAt'>>,
): Promise<Assessment | null> {
  try {
    const existing = await getAssessment(id);
    if (!existing) return null;
    const updated: Assessment = {
      ...existing,
      ...patch,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };
    await fs.writeFile(filePath(id), JSON.stringify(updated, null, 2), 'utf8');
    return updated;
  } catch (err) {
    console.warn(`[storage] updateAssessment failed for ${id}:`, err);
    return null;
  }
}

export async function listAssessments(): Promise<Assessment[]> {
  try {
    await ensureDir();
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    const items = await Promise.all(
      jsonFiles.map(async (f) => {
        const raw = await fs.readFile(path.join(DATA_DIR, f), 'utf8');
        return JSON.parse(raw) as Assessment;
      }),
    );
    return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    console.warn('[storage] listAssessments failed:', err);
    return [];
  }
}

export async function deleteAssessment(id: string): Promise<void> {
  try {
    await fs.unlink(filePath(id));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn(`[storage] deleteAssessment failed for ${id}:`, err);
    }
  }
}
