import { promises as fs } from 'fs';
import path from 'path';
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
// Resolved lazily at first use so static tracing doesn't follow
// `os.tmpdir()` and `process.cwd()` into the build manifest.
let DATA_DIR: string | null = null;

async function ensureDir(): Promise<string | null> {
  if (DATA_DIR) return DATA_DIR;
  const candidates = [
    path.join(process.cwd(), 'data', 'assessments'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    path.join((require('os') as typeof import('os')).tmpdir(), 'snapaireport-assessments'),
  ];
  for (const dir of candidates) {
    try {
      await fs.mkdir(dir, { recursive: true });
      DATA_DIR = dir;
      return DATA_DIR;
    } catch {
      // Try next candidate
    }
  }
  console.warn('[storage] no writable directory for submissions');
  return null;
}

function filePath(dir: string, id: string): string {
  return path.join(dir, `${id}.json`);
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
    const dir = await ensureDir();
    if (dir) {
      await fs.writeFile(filePath(dir, assessment.id), JSON.stringify(assessment, null, 2), 'utf8');
    }
  } catch (err) {
    console.warn(`[storage] createAssessment write failed for ${assessment.id}:`, err);
  }
  return assessment;
}

export async function getAssessment(id: string): Promise<Assessment | null> {
  try {
    const dir = await ensureDir();
    if (!dir) return null;
    const raw = await fs.readFile(filePath(dir, id), 'utf8');
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
    const dir = await ensureDir();
    if (dir) {
      await fs.writeFile(filePath(dir, id), JSON.stringify(updated, null, 2), 'utf8');
    }
    return updated;
  } catch (err) {
    console.warn(`[storage] updateAssessment failed for ${id}:`, err);
    return null;
  }
}

export async function listAssessments(): Promise<Assessment[]> {
  try {
    const dir = await ensureDir();
    if (!dir) return [];
    const files = await fs.readdir(dir);
    const jsonFiles = files.filter((f) => f.endsWith('.json'));
    const items = await Promise.all(
      jsonFiles.map(async (f) => {
        const raw = await fs.readFile(path.join(dir, f), 'utf8');
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
    const dir = await ensureDir();
    if (dir) await fs.unlink(filePath(dir, id));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn(`[storage] deleteAssessment failed for ${id}:`, err);
    }
  }
}
