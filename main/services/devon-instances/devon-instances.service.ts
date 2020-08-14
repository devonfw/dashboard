import fs from 'fs';
import path from 'path';
import https from 'https';
import platform from 'os';
import {
  DevonfwConfig,
  IdeDistribution,
  DevonIdeScripts,
} from '../../models/devonfw-dists.model';
import * as util from 'util';
import * as child from 'child_process';
import {
  ProcessState,
  ProjectDetails,
} from '../../models/project-details.model';
import { SaveDetails } from './save-details';
import { exec } from 'child_process';

const utilExec = util.promisify(child.exec);
const utilReaddir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const unlink = util.promisify(fs.unlink);

export class DevonInstancesService implements SaveDetails {
  private devonFilePath = path.resolve(
    platform.homedir(),
    '.devon',
    'projectinfo.json'
  );

  /* Find out DEVON ide instances  */
  getAvailableDevonIdeInstances(): Promise<number> {
    const dirReader = new Promise<number>((resolve, reject) => {
      this.getAllUserCreatedDevonInstances().then(
        (instances: DevonfwConfig) => {
          this.getCreatedDevonInstancesCount(instances)
            .then((count) => {
              resolve(count);
            })
            .catch((error) => reject(error));
        }
      );
    });
    return dirReader;
  }

  /* Finding out total count of projects available in each DEVON ide instances */
  getCreatedDevonInstancesCount(instances: DevonfwConfig): Promise<number> {
    const promiseInstances = [];
    return new Promise<number>((resolve, reject) => {
      for (const distribution of instances.distributions) {
        if (distribution.id) {
          promiseInstances.push(this.getInstances(distribution.id));
        }
      }
      this.countInstance(promiseInstances)
        .then((count) => resolve(count))
        .catch((error) => reject(error));
    });
  }

  /* Calculating all the projects of available DEVON IDE instances and
    returning total count of projects
  */
  countInstance(intances: Promise<number>[]): Promise<number> {
    let instanceCount = 0;
    if (intances.length) {
      return new Promise<number>((resolve, reject) => {
        Promise.all(intances)
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
      });
    }
  }

  /* Get the total count of projects avaiable in each workspace   */
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

  /* Finding all DEVON instances created by USER */
  getAllUserCreatedDevonInstances(): Promise<DevonfwConfig> {
    const instancesDirReader = new Promise<DevonfwConfig>((resolve, reject) => {
      fs.readFile(
        path.resolve(process.env.USERPROFILE, '.devon', 'ide-paths'),
        'utf8',
        (err, data) => {
          if (err) reject('No instances find out');
          this.devonfwInstance(data)
            .then((instances: DevonfwConfig) => resolve(instances))
            .catch((error) => console.log(error));
        }
      );
    });
    return instancesDirReader;
  }

  async devonfwInstance(data: string): Promise<DevonfwConfig> {
    let paths: string[] = [];
    const instances: DevonfwConfig = { distributions: [] };
    if (data) {
      paths = data.split('\n');
      for (let singlepath of paths) {
        if (singlepath) {
          if (process.platform === 'win32') {
            singlepath = singlepath
              .replace('/', '')
              .replace('/', ':/')
              .replace(/\//g, path.sep);
          }
          try {
            const { stdout, stderr } = await utilExec('devon -v', {
              cwd: path.resolve(singlepath, 'scripts'),
            });
            instances.distributions.push(
              this.getIdeDistribution(singlepath, stdout)
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    return instances;
  }

  getIdeDistribution(singlepath: string, stdout: string): IdeDistribution {
    return {
      id: singlepath,
      ideConfig: {
        version: stdout.trim(),
        basepath: singlepath,
        commands: path.resolve(singlepath, 'scripts', 'command'),
        workspaces: path.resolve(singlepath, 'workspaces'),
      },
    };
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

  /* Checking projectinfo.json is exists?, if exits overriding data or 
    creating a json file with project details
  */
  getData(data: ProjectDetails, writeFile: (data) => void): void {
    fs.exists(this.devonFilePath, (exists: boolean) => {
      if (exists) {
        writeFile(data);
      } else {
        this.writeFile([{ ...data }], { flag: 'wx' });
      }
    });
  }

  /* Storing information of Project details */
  saveProjectDetails(data: ProjectDetails): void {
    this.getData(data, (data: ProjectDetails) => {
      this.readFile()
        .then((details: ProjectDetails[]) => {
          if (details && details.length) {
            const projectDetails = details.splice(0);
            projectDetails.push(data);
            this.writeFile(projectDetails);
          } else if (details && details.length === 0) {
            this.writeFile([data]);
          }
        })
        .catch((error) => {
          throw error;
        });
    });
  }

  /* Writing up project deatils in a JSON file */
  writeFile(data: ProjectDetails[], flag?: { flag: string }): void {
    const optional = flag ? flag : '';
    fs.writeFile(this.devonFilePath, JSON.stringify(data), optional, function (
      err
    ) {
      if (err) throw err;
    });
  }

  /* Reading out project deatils which user has created */
  readFile(): Promise<ProjectDetails[]> {
    return new Promise<ProjectDetails[]>((resolve, reject) => {
      fs.readFile(this.devonFilePath, (error, data) => {
        if (error) reject(resolve([]));
        resolve(data ? JSON.parse(data.toString()) : []);
      });
    });
  }

  async deleteProjectFolder(projectPath: string) {
    const entries = await utilReaddir(projectPath, { withFileTypes: true });
    const results = await Promise.all(
      entries.map((entry) => {
        const fullPath = path.join(projectPath, entry.name);
        const task = entry.isDirectory()
          ? this.deleteProjectFolder(fullPath)
          : unlink(fullPath);
        return task.catch((error) => ({ error }));
      })
    );
    results.forEach((result) => {
      if (result && result.error.code !== 'ENOENT') throw result.error;
    });
    await rmdir(projectPath);
  }

  async openIdeExecutionCommandForVscode(
    project: ProjectDetails
  ): Promise<ProcessState> {
    try {
      return await utilExec(this.findCommand(project.domain), {
        cwd: project.path,
      });
    } catch (error) {
      console.log(error);
    }
  }

  openIdeExecutionCommand(project: ProjectDetails): Promise<ProcessState> {
    return new Promise<ProcessState>((resolve, reject) => {
      const terminal = exec(this.findCommand(project.domain), {
        cwd: project.path,
      });

      terminal.stdout.on('data', (data) => {
        resolve({
          stdout: data.toString(),
          stderr: '',
        });
      });

      terminal.stderr.on('data', (data) => {
        reject({
          stdout: '',
          stderr: data.toString(),
        });
      });

      terminal.on('close', () => {
        resolve(null);
      });
    });
  }

  findCommand(domain: string): string {
    switch (domain) {
      case 'java':
        return 'devon eclipse';
      case 'angular':
      case 'node':
        return 'devon vscode';
    }
  }

  deleteProject(projectDetail: ProjectDetails): Promise<ProjectDetails[]> {
    return new Promise<ProjectDetails[]>((resolve, reject) => {
      this.deleteProjectFolder(projectDetail.path)
        .then(async () => {
          const projects = await this.readFile();
          const updatedProjects = projects.filter(
            (project) => project.name !== projectDetail.name
          );
          this.writeFile(updatedProjects);
          return updatedProjects.length
            ? resolve(updatedProjects)
            : resolve([]);
        })
        .catch(() => {
          reject([]);
        });
    });
  }
}
