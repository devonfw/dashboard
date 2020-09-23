import { dirname } from 'path';
import fs from 'fs';

export default class FileText {
  path: string;

  constructor(absolutePath: string) {
    this.path = absolutePath;
  }

  exists(): Promise<boolean> {
    return new Promise((resolve) => {
      fs.access(this.path, fs.constants.F_OK, (err) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }

  async write(data: string): Promise<NodeJS.ErrnoException | void> {
    await this.ensureDirectoryExists(dirname(this.path));
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, data, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  read(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (err, data) => {
        if (err) reject('file not found');
        if (!data) reject('empty file');
        resolve(data);
      });
    });
  }

  private ensureDirectoryExists(dirname: string): Promise<void> {
    return fs.promises.mkdir(dirname, { recursive: true });
  }
}
