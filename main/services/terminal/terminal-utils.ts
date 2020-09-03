import { ChildProcessWithoutNullStreams } from 'child_process';

export interface JSMap {
  [key: string]: string | number;
}

function isNotEmpty(str: string): boolean {
  return str != '\x0d' && !!str;
}

export function dirStringToArray(dirs: string): string[] {
  return dirs.split('\n').filter(isNotEmpty);
}

export function getOptions(opts: JSMap): JSMap | undefined {
  const options = {};

  for (const key of Object.keys(opts)) {
    const value = opts[key];
    if (!!value) {
      options[key] = value;
    }
  }

  return options ? options : undefined;
}

export function spawnHandler(
  spawn: ChildProcessWithoutNullStreams
): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = '';
    let error = '';
    spawn.stdout.on('data', (data) => {
      result += data;
    });
    spawn.stderr.on('data', (data) => {
      error += data;
    });
    spawn.on('close', () => {
      if (error) {
        reject(result + error);
      } else {
        resolve(result + error);
      }
    });
    spawn.stdin.end();
  });
}
