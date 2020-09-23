import FileText from './file-text';

export default class File {
  path: string;
  fileText: FileText;

  constructor(absolutePath: string) {
    this.path = absolutePath;
    this.fileText = new FileText(this.path);
  }

  exists(): Promise<boolean> {
    return this.fileText.exists();
  }

  writeObject<T>(data: T): Promise<NodeJS.ErrnoException | void> {
    const dataJSON = JSON.stringify(data);
    return this.write(dataJSON);
  }

  write(data: string): Promise<NodeJS.ErrnoException | void> {
    return this.fileText.write(data);
  }

  readObject<T>(): Promise<T> {
    return new Promise((resolve, reject) => {
      this.read()
        .then((data: Buffer) => resolve(JSON.parse(data.toString())))
        .catch((err) => reject(err));
    });
  }

  read(): Promise<Buffer> {
    return this.fileText.read();
  }
}
