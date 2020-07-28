import fs from 'fs';
import path from 'path';
import https from 'https';
import { platform } from 'os';
import {
  DevonfwConfig,
  IdeDistribution,
  DevonIdeScripts,
} from '../../models/devonfw-dists.model';
import * as util from 'util';
import * as child from 'child_process';

const exec = util.promisify(child.exec);

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
        async (err, data) => {
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
                const { stdout, stderr } = await exec('devon -v', {
                  cwd: path.resolve(singlepath, 'scripts'),
                });
                const instance: IdeDistribution = {
                  id: singlepath,
                  ideConfig: {
                    version: stdout.trim(),
                    basepath: singlepath,
                    commands: path.resolve(singlepath, 'scripts', 'command'),
                    workspaces: path.resolve(singlepath, 'workspaces'),
                  },
                };
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

  getDevonIdeScriptsFromMaven(): Promise<any> {
    let ideScripts: DevonIdeScripts[] = [];
    let data = '';
    const ideScriptsPromise = new Promise<any>((resolve, reject) => {
      https
        .get(
          'https://search.maven.org/classic/solrsearch/select?q=g%3A%22com.devonfw.tools.ide%22%20AND%20a%3A%22devonfw-ide-scripts%22&rows=20&core=gav&wt=json',
          (res) => {
            res.on('data', (d) => {
              data += d;
            });
            res.on('end', () => {
              const jsonData = JSON.parse(data);
              ideScripts = jsonData['response']['docs'].map((i) => {
                return { version: i.v, updated: i.timestamp };
              });
              resolve(ideScripts);
            });
          }
        )
        .on('error', (e) => {
          reject('error: ' + e);
        });
    });
    return ideScriptsPromise;
  }
}
