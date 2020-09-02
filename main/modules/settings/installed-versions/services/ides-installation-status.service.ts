import {
  DevonIdeScript,
  IdeInstallationStatus,
} from '../../../../models/devonfw-dists.model';
import getChangelog from './fetch-changelog';

interface IdeVersions {
  getInstalledVersions(): Promise<string[]>;
}

interface DevonfwIDEsRetriever {
  getDevonfwIDEs(): Promise<DevonIdeScript[]>;
}

export default class IDEsInstallationStatus {
  constructor(
    public versions: IdeVersions,
    public idesRetriever: DevonfwIDEsRetriever
  ) {}

  async getDevonfwIDEsStatus(): Promise<IdeInstallationStatus[]> {
    const versions = await this.versions.getInstalledVersions();
    const ides = await this.idesRetriever.getDevonfwIDEs();

    return Promise.all(
      ides.map(async (ide) => ({
        ...ide,
        installed: versions.includes(ide.version),
        changelog: await getChangelog(ide.version),
        downloading: false,
      }))
    );
  }
}
