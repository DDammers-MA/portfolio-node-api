import { put } from '@vercel/blob';
import { readdir, readFile } from 'fs/promises';
import { extname, join } from 'path';

const dir = 'uploads';
const types = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };

for (const filename of await readdir(dir)) {
  const contentType = types[extname(filename).toLowerCase()];
  if (!contentType) continue; // skip anything that isn't an image

  const blob = await put(`projects/${filename}`, await readFile(join(dir, filename)), {
    access: 'public',
    contentType,
    addRandomSuffix: false, // keeps the filename readable
  });

  const f = filename.replace(/'/g, "''");
  for (const col of ['main_image', 'sub_image_1', 'sub_image_2', 'sub_image_3']) {
    console.log(`UPDATE projects SET ${col} = '${blob.url}' WHERE ${col} = '${f}';`);
  }
}