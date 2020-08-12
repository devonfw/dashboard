import { ChildProcessWithoutNullStreams } from 'child_process';

export function promiseChildProcess(
  childProcess: ChildProcessWithoutNullStreams
): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = '';
    let error = '';
    childProcess.stdout.on('data', (data) => {
      result += data;
    });
    childProcess.stderr.on('data', (data) => {
      error += data;
    });
    childProcess.on('close', () => {
      if (error) {
        reject(result + error);
      } else {
        resolve(result + error);
      }
    });
    childProcess.stdin.end();
  });
}
