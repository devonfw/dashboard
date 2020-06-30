import fs from 'fs';
import path from 'path';

export class DevonInstancesService {
    getAvailableDevonIdeInstances(): Promise<number> {
        let instanceCount = 0;
        let promiseInstances = [];
        let paths;
        const dirReader = new Promise<number>((resolve, reject) => {
            fs.readFile(path.resolve(process.env.USERPROFILE, 'devon.txt'), 'utf8', (err, data) => {
                if (err) reject('No instances find out');
                if (data) {
                    const getCorrectedPaths = data.replace(/(\r\n|\n|\r)/gm, "");
                    paths = getCorrectedPaths.split(';');
                    console.log('Check Paths:', paths);
                    for (let path of paths) {
                        if (path) {
                            promiseInstances.push(this.getInstances(path));
                        }
                    }
                    if (promiseInstances.length) {
                        Promise.all(promiseInstances)
                            .then((results) => {
                                console.log("Get All Instances", results);
                                for (let result of results) {
                                    instanceCount = instanceCount + result;
                                }
                                resolve(instanceCount);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }
            });
        });
        return dirReader;
    }

    getInstances(instancepath: string): Promise<number> {
        const devonInstances = new Promise<number>((resolve, reject) => {
            fs.readdir(path.resolve(instancepath, 'workspaces'), (error, files) => {
                if (error) reject(`Error: may be path issues', ${instancepath}`);
                if (files) {
                    resolve(files.length);
                }
            });
        });
        return devonInstances;
    }
}