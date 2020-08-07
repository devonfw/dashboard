import * as fs from 'fs';

export function readdirPromise(dir: string): Promise<string[]> {
  const dirReader: Promise<string[]> = new Promise((resolve, reject) => {
    fs.readdir(dir, (err: Error, files: []) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

  return dirReader;
}
