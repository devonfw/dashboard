import { shell } from 'electron';
import fs from 'fs';
import path from 'path';
import {
  DevonfwConfig,
  IdeDistribution,
  DevonIdeScript,
} from '../../models/devonfw-dists.model';
import * as util from 'util';
import * as child from 'child_process';
import {
  ProcessState,
  ProjectDetails,
} from '../../models/project-details.model';
import { SaveDetails } from './save-details';
import { exec } from 'child_process';
import {
  idePathsFilePath,
  devonFilePath,
} from '../../modules/shared/config/paths';

const utilExec = util.promisify(child.exec);
const utilReaddir = util.promisify(fs.readdir);
const rmdir = util.promisify(fs.rmdir);
const unlink = util.promisify(fs.unlink);

export default class DevonInstancesService implements SaveDetails {
  /* Finding out total count of projects available in each DEVON ide instances */
  getProjectsCount(): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const projectDetails = await this.readFile();
        resolve(projectDetails.length);
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  }

  updateUserCreatedDevonInstances(data: IdeDistribution[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const formattedData =
        data
          .map((ide) => ide.ideConfig.basepath)
          .map((basepath) => this.formatPathFromWindows(basepath))
          .join('\n') + '\n';
      fs.writeFile(idePathsFilePath, formattedData, (err) => {
        if (err) reject(err);
        else resolve('Successs');
      });
    });
  }

  formatPathToWindows(dirPath: string): string {
    return dirPath.replace('/', '').replace('/', ':/').replace(/\//g, path.sep);
  }

  formatPathFromWindows(dirPath: string): string {
    return dirPath.replace('', '/').replace(':', '').replace(/\\/g, '/');
  }

  // Remove project details from projectinfo.json for the given ide
  async removeProjectInfo(idePath: string): Promise<boolean> {
    try {
      const projects: ProjectDetails[] = await this.readFile();
      const filteredProjects = projects.filter(
        (project) => !project.path.includes(idePath)
      );
      this.writeFile(filteredProjects);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Remove path from ide-paths for the given ide
  async removeIdeInfo(idePath: string): Promise<boolean> {
    try {
      const ides: DevonfwConfig = await this.getAllUserCreatedDevonInstances();
      const filteredIdes: IdeDistribution[] = ides.distributions.filter(
        (ide) => !ide.ideConfig.basepath.includes(idePath)
      );
      const result = await this.updateUserCreatedDevonInstances(filteredIdes);
      return result === 'Successs' ? true : false;
    } catch (e) {
      return false;
    }
  }

  async uninstallIde(idePath: string): Promise<boolean> {
    try {
      const projectRemovalSuccess = await this.removeProjectInfo(idePath);
      const ideRemovalSuccess = await this.removeIdeInfo(idePath);
      return projectRemovalSuccess && ideRemovalSuccess;
    } catch (e) {
      return false;
    }
  }

  // Open system file explorer to view projects or devonfw IDEs
  openPathInSystemExplorer(idePath: string): void {
    shell.showItemInFolder(idePath);
  }

  /* Finding all DEVON instances created by USER */
  getAllUserCreatedDevonInstances(): Promise<DevonfwConfig> {
    const instancesDirReader = new Promise<DevonfwConfig>((resolve, reject) => {
      fs.readFile(idePathsFilePath, 'utf8', (err, data) => {
        if (err) reject('No instances found');
        this.devonfwInstance(data)
          .then((instances: DevonfwConfig) => resolve(instances))
          .catch(() => reject('No instances found'));
      });
    });
    return instancesDirReader;
  }

  async getInstalledVersions(): Promise<string[]> {
    const devonfwConfig: DevonfwConfig = await this.getAllUserCreatedDevonInstances();
    const distributions: IdeDistribution[] = devonfwConfig.distributions;
    const versions: string[] = distributions.map(
      (distribution: IdeDistribution) => distribution.ideConfig.version
    );

    return versions;
  }

  async getInstalledDevonfwIDEs(): Promise<DevonIdeScript[]> {
    const devonfwConfig: DevonfwConfig = await this.getAllUserCreatedDevonInstances();
    const distributions: IdeDistribution[] = devonfwConfig.distributions;
    const installedDevonfwIDEs: DevonIdeScript[] = distributions.map(
      (distribution: IdeDistribution) => {
        return {
          version: distribution.ideConfig.version,
          path: distribution.ideConfig.basepath,
        };
      }
    );

    return installedDevonfwIDEs;
  }

  async devonfwInstance(data: string): Promise<DevonfwConfig> {
    let paths: string[] = [];
    const instances: DevonfwConfig = { distributions: [] };
    if (data) {
      paths = data.split('\n');
      for (let singlepath of paths) {
        if (singlepath) {
          if (process.platform === 'win32') {
            singlepath = this.formatPathToWindows(singlepath);
          }
          try {
            const { stdout } = await utilExec('devon -v', {
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

  /* Checking projectinfo.json is exists?, if exits overriding data or 
    creating a json file with project details
  */
  getData(data: ProjectDetails, writeFile: (data) => void): void {
    fs.exists(devonFilePath, (exists: boolean) => {
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
    fs.writeFile(devonFilePath, JSON.stringify(data), optional, function (err) {
      if (err) throw err;
    });
  }

  /* Reading out project deatils which user has created */
  readFile(): Promise<ProjectDetails[]> {
    return new Promise<ProjectDetails[]>((resolve, reject) => {
      fs.readFile(devonFilePath, (error, data) => {
        if (error) reject(resolve([]));
        resolve(data ? JSON.parse(data.toString()) : []);
      });
    });
  }

  async deleteProjectFolder(projectPath: string): Promise<void> {
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
    project: ProjectDetails,
    ide: string
  ): Promise<ProcessState> {
    try {
      return await utilExec(this.findCommand(ide), {
        cwd: project.path,
      });
    } catch (error) {
      console.error(error);
    }
  }

  openIdeExecutionCommand(
    project: ProjectDetails,
    ide: string
  ): Promise<ProcessState> {
    return new Promise<ProcessState>((resolve, reject) => {
      const terminal = exec(this.findCommand(ide), {
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

  findCommand(ide: string): string {
    switch (ide) {
      case 'eclipse':
        return 'devon eclipse';
      case 'vscode':
        return 'devon vscode';
    }
  }

  deleteProject(
    projectDetail: ProjectDetails,
    dirPath: string
  ): Promise<ProjectDetails[]> {
    return new Promise<ProjectDetails[]>((resolve, reject) => {
      this.deleteProjectFolder(projectDetail.path)
        .then(async () => {
          const projects = await this.readFile();
          const relatedDirProjects = projects.filter(
            (project) =>
              project.name !== projectDetail.name &&
              project.path.includes(dirPath)
          );
          const otherDirProjects = projects.filter(
            (project) => !project.path.includes(dirPath)
          );
          this.writeFile([...relatedDirProjects, ...otherDirProjects]);
          return relatedDirProjects.length
            ? resolve(relatedDirProjects)
            : resolve([]);
        })
        .catch((error) => {
          console.error(error);
          reject([]);
        });
    });
  }
}
