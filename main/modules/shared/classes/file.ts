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

  writeObject<T>(data: T): Promise<NodeJS.ErrnoException | void> {
    const dataJSON = JSON.stringify(data);
    return this.write(dataJSON);
  }

  write(data: string): Promise<NodeJS.ErrnoException | void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, data, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  readObject<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.read()
        .then((data: Buffer) => resolve(JSON.parse(data.toString())))
        .catch((err) => reject(err));
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
}
