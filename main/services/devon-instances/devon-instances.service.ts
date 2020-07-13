import fs from 'fs';
import path from 'path';
import { DevonfwConfig, IdeDistribution } from '../../models/devonfw-dists.model';

const exec = require('child_process').exec;

export class DevonInstancesService {
    getAvailableDevonIdeInstances(): Promise<number> {
        let instanceCount = 0;
        let promiseInstances = [];
        const dirReader = new Promise<number>((resolve, reject) => {
            this.getAllUserCreatedDevonInstances().then((instances: DevonfwConfig) => {
                for (let distribution of instances.distributions) {
                    if (distribution.id) {
                        promiseInstances.push(this.getInstances(distribution.id));
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

    getAllUserCreatedDevonInstances(): Promise<DevonfwConfig> {
        let paths = [];
        let instances: DevonfwConfig = { distributions: [] };
        const instancesDirReader = new Promise<DevonfwConfig>((resolve, reject) => {
            fs.readFile(path.resolve(process.env.USERPROFILE, '.devon', 'ide-paths'), 'utf8', (err, data) => {
                if (err) reject('No instances find out');
                if (data) {
                    paths = data.split('\n');
                    for (let path of paths) {
                        if (path) {
                            const instance: IdeDistribution = {
                                id: path,
                                    ideConfig: {
                                        version: '',
                                        basepath: path,
                                        commands: path + '\\scripts\\command',
                                        workspaces: path + '\\workspaces'
                                    }
                            };
                            exec('devon -v', { cwd: path + '\\scripts' }, (err, stdout, stderr) => {
                                instance.ideConfig.version = stdout;
                            })
                            instances.distributions.push(instance);
                        }
                    }
                    resolve(instances);
                }
            });
        });
        return instancesDirReader;
    }
}