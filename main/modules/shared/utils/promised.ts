import * as fs from 'fs';
import { join, basename } from 'path';

export function readdirPromise(dir: string): Promise<string[]> {
  const dirReader: Promise<string[]> = new Promise((resolve, reject) => {
    fs.readdir(dir, (err: Error, files: []) => {
      if (err) {
        reject(err);
      } else {
        const dirs = files
          .map((file) => join(dir, file))
          .filter((file) => fs.statSync(file).isDirectory())
          .map((dirPath) => basename(dirPath));
        resolve(dirs);
      }
    });
  });

  return dirReader;
}
