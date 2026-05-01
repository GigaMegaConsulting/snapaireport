import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { Assessment } from '../types/report';

const DATA_DIR = path.join(process.cwd(), 'data', 'assessments');

async function ensureDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function filePath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

export async function createAssessment(
  input: Omit<Assessment, 'id' | 'status' | 'createdAt' | 'updatedAt'> &
    Partial<Pick<Assessment, 'status'>>,
): Promise<Assessment> {
  await ensureDir();
  const now = new Date().toISOString();
  const assessment: Assessment = {
    id: randomUUID(),
    status: 'transcript_received',
    createdAt: now,
    updatedAt: now,
    ...input,
  };
  await fs.writeFile(filePath(assessment.id), JSON.stringify(assessment, null, 2), 'utf8');
  return assessment;
}

export async function getAssessment(id: string): Promise<Assessment | null> {
  try {
    const raw = await fs.readFile(filePath(id), 'utf8');
    return JSON.parse(raw) as Assessment;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

export async function updateAssessment(
  id: string,
  patch: Partial<Omit<Assessment, 'id' | 'createdAt'>>,
): Promise<Assessment> {
  const existing = await getAssessment(id);
  if (!existing) throw new Error(`Assessment not found: ${id}`);
  const updated: Assessment = {
    ...existing,
    ...patch,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(filePath(id), JSON.stringify(updated, null, 2), 'utf8');
  return updated;
}

export async function listAssessments(): Promise<Assessment[]> {
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
}

export async function deleteAssessment(id: string): Promise<void> {
  try {
    await fs.unlink(filePath(id));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
  }
}
