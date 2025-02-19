import fs from 'fs';
import path from 'path';

export async function createFolderIfNotExists(folderPath: string): Promise<void> {
  try {
    await fs.promises.access(folderPath);
  } catch {
    await fs.promises.mkdir(folderPath, { recursive: true });
  }
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function getRelativePath(filePath: string): string {
  const contentDir = path.join(process.cwd(), 'content');
  return path.relative(contentDir, filePath);
}

export function ensureFileExists(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
} 