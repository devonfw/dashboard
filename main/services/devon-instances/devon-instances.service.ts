import fs from 'fs';
import path from 'path';

export class DevonInstancesService {
    getAvailableDevonIdeInstances(): Promise<number> {
        let instanceCount = 0;
        let promiseInstances = [];
        const dirReader = new Promise<number>((resolve, reject) => {
            this.getAllUserCreatedDevonInstances().then((instancesPath: string[]) => {
                for (let path of instancesPath) {
                    if (path) {
                        promiseInstances.push(this.getInstances(path));
                    }
                }
                if (promiseInstances.length) {
                    Promise.all(promiseInstances)
                        .then((results) => {
                            for (let result of results) {
                                instanceCount = instanceCount + result;
                            }
                            resolve(instanceCount);
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(error);
                        });
                }
            });
        });
        return dirReader;
    }

    getInstances(instancepath: string): Promise<number> {
        const devonInstances = new Promise<number>((resolve, reject) => {
            fs.readdir(path.resolve(instancepath, 'workspaces'), (error, files) => {
                if (error) reject(resolve(0));
                if (files) {
                    resolve(files.length);
                }
            });
        });
        return devonInstances;
    }

    getAllUserCreatedDevonInstances(): Promise<string[]> {
        let paths = [];
        let instances = [];
        const instancesDirReader = new Promise<string[]>((resolve, reject) => {
            fs.readFile(path.resolve(process.env.USERPROFILE, '.devon', 'ide-paths'), 'utf8', (err, data) => {
                if (err) reject('No instances find out');
                if (data) {
                    paths = data.split('\r\n');
                    for (let path of paths) {
                        if (path) {
                            instances.push(path);
                        }
                    }
                    resolve(instances);
                }
            });
        });
        return instancesDirReader;
    }
}