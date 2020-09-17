import fs from 'fs';

export default class File {
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

  write<T>(data: T): Promise<NodeJS.ErrnoException | void> {
    const dataJSON = JSON.stringify(data);

    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, dataJSON, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  read<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.readAsBuffer()
        .then((data: Buffer) => resolve(JSON.parse(data.toString())))
        .catch((err) => reject(err));
    });
  }

  readAsBuffer(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (err, data) => {
        if (err) reject('file not found');
        if (!data) reject('empty file');
        resolve(data);
      });
    });
  }
}
