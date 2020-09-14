import tar from 'tar';
import { join } from 'path';

export default class ExtractorService {
  extract(path: string, filename: string): Promise<void> {
    return tar.extract({
      file: join(path, filename),
      cwd: path,
    });
  }
}
