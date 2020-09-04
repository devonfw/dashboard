import { shell } from 'electron';
import { DevonInstancesService } from '../../services/devon-instances/devon-instances.service';
import {
  DevonIdeScripts,
  IdeDistribution,
  InstalledVersions,
  DevonfwConfig,
} from '../../models/devonfw-dists.model';
import { ProjectDetails } from '../../models/project-details.model';

export async function getInstalledVersions(): Promise<InstalledVersions[]> {
  const devonInstanceService = new DevonInstancesService();
  try {
    let localVersions = await devonInstanceService.getAllUserCreatedDevonInstances();
    let mavenVersions = await devonInstanceService.getDevonIdeScriptsFromMaven();
    localVersions = typeof localVersions === 'string' ? null : localVersions;
    mavenVersions = typeof mavenVersions === 'string' ? [] : mavenVersions;
    return getConsolidatedVersionsData(
      localVersions.distributions,
      mavenVersions
    );
  } catch (e) {
    return [];
  }
}

export async function uninstallIde(idePath: string): Promise<boolean> {
  const devonInstanceService = new DevonInstancesService();
  try {
    const projects: ProjectDetails[] = await devonInstanceService.readFile();
    const filteredProjects: ProjectDetails[] = removeProjectInfo(
      idePath,
      projects
    );
    devonInstanceService.writeFile(filteredProjects);
    const ides: DevonfwConfig = await devonInstanceService.getAllUserCreatedDevonInstances();
    const filteredIdes: DevonfwConfig = removeIdeInfo(idePath, ides);
    const result = await devonInstanceService.updateUserCreatedDevonInstances(
      filteredIdes
    );
    return result === 'Successs' ? true : false;
  } catch (e) {
    return false;
  }
}

export function openIdeInSystemExplorer(idePath: string): void {
  shell.showItemInFolder(idePath);
}

// Remove project details from projectinfo.json for the given ide
function removeProjectInfo(
  idePath: string,
  allProjectsInfo: ProjectDetails[]
): ProjectDetails[] {
  return allProjectsInfo.filter((project) => !project.path.includes(idePath));
}

// Remove path from ide-paths for the given ide
function removeIdeInfo(
  idePath: string,
  allIdesInfo: DevonfwConfig
): DevonfwConfig {
  return {
    distributions: allIdesInfo.distributions.filter(
      (ide) => !ide.ideConfig.basepath.includes(idePath)
    ),
  };
}

// Filtering out locally installed IDEs from maven repository list
function getFilteredMavenVersions(
  localIdes: InstalledVersions[],
  mavenIdes: InstalledVersions[]
) {
  const localVersions = localIdes.map((ide) => ide.version);
  return mavenIdes.filter((ide) => {
    return !localVersions.includes(ide.version);
  });
}

// Combine and format local installations and downloadable installations
function getConsolidatedVersionsData(
  localVersions: IdeDistribution[],
  mavenVersions: DevonIdeScripts[]
): InstalledVersions[] {
  const installedVersions: InstalledVersions[] = localVersions
    ? localVersions.map((ide) => {
        return {
          version: ide.ideConfig.version,
          path: ide.ideConfig.basepath,
          updated: getReleaseDate(ide.ideConfig.version, mavenVersions),
        };
      })
    : [];
  let moreVersions: InstalledVersions[] = mavenVersions.map((ide) => {
    return {
      version: ide.version,
      updated: getFormattedDate(ide.updated),
      url: getIdeUrl(ide.version),
    };
  });
  moreVersions = getFilteredMavenVersions(installedVersions, moreVersions);
  installedVersions.push(...moreVersions);
  return installedVersions;
}

function getReleaseDate(
  queryVersion: string,
  allVersions: DevonIdeScripts[]
): string {
  const date = allVersions.find((ide) => ide.version === queryVersion).updated;
  return getFormattedDate(date);
}

function getFormattedDate(d: Date): string {
  const releaseDate = new Date(d);
  return (
    releaseDate.toLocaleString('default', { day: '2-digit' }) +
    '-' +
    releaseDate.toLocaleString('default', { month: 'short' }) +
    '-' +
    releaseDate.getFullYear()
  );
}

function getIdeUrl(version: string): string {
  return (
    'https://search.maven.org/classic/remotecontent?filepath=com/devonfw/tools/ide/devonfw-ide-scripts/' +
    version +
    '/devonfw-ide-scripts-' +
    version +
    '.tar.gz'
  );
}
