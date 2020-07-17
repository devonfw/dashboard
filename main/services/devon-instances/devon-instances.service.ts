import fs from 'fs';
import path from 'path';
import { platform } from 'os';
import {
  DevonfwConfig,
  IdeDistribution,
} from '../../models/devonfw-dists.model';
import * as child from 'child_process';

const exec = child.exec;

export class DevonInstancesService {
  getAvailableDevonIdeInstances(): Promise<number> {
    let instanceCount = 0;
    const promiseInstances = [];
    const dirReader = new Promise<number>((resolve, reject) => {
      this.getAllUserCreatedDevonInstances().then(
        (instances: DevonfwConfig) => {
          for (const distribution of instances.distributions) {
            if (distribution.id) {
              promiseInstances.push(this.getInstances(distribution.id));
            }
          }
          if (promiseInstances.length) {
            Promise.all(promiseInstances)
              .then((results) => {
                for (const result of results) {
                  instanceCount = instanceCount + result;
                }
                resolve(instanceCount);
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        }
      );
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
    const instances: DevonfwConfig = { distributions: [] };
    const instancesDirReader = new Promise<DevonfwConfig>((resolve, reject) => {
      fs.readFile(
        path.resolve(process.env.USERPROFILE, '.devon', 'ide-paths'),
        'utf8',
        (err, data) => {
          if (err) reject('No instances find out');
          if (data) {
            paths = data.split('\n');
            for (let singlepath of paths) {
              if (singlepath) {
                if (platform() === 'win32') {
                  singlepath = singlepath.replace('/', '');
                  singlepath = singlepath.replace('/', ':/');
                  singlepath = singlepath.replace(/\//g, path.sep);
                }  
                const instance: IdeDistribution = {
                  id: singlepath,
                  ideConfig: {
                    version: '',
                    basepath: singlepath,
                    commands: path.resolve(singlepath, 'scripts', 'command'),
                    workspaces: path.resolve(singlepath, 'workspaces'),
                  },
                };
                exec(
                  'devon -v',
                  { cwd: path.resolve(singlepath, 'scripts') },
                  (_: unknown, stdout: string) => {
                    instance.ideConfig.version = stdout;
                  }
                );
                instances.distributions.push(instance);
              }
            }
            resolve(instances);
          }
        }
      );
    });
    return instancesDirReader;
  }
}
