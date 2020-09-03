import {
  DevonIdeScript,
  IdeInstallationStatus,
} from '../../../../models/devonfw-dists.model';
import ChangelogService from './changelog.service';

interface IdeVersions {
  getInstalledVersions(): Promise<string[]>;
}

interface DevonfwIDEsRetriever {
  getDevonfwIDEs(): Promise<DevonIdeScript[]>;
}

export default class IDEsInstallationStatus {
  private changelogService: ChangelogService;

  constructor(
    private versions: IdeVersions,
    private idesRetriever: DevonfwIDEsRetriever
  ) {
    this.changelogService = new ChangelogService();
  }

  async getDevonfwIDEsStatus(): Promise<IdeInstallationStatus[]> {
    const versions = await this.versions.getInstalledVersions();
    const ides = await this.idesRetriever.getDevonfwIDEs();

    return Promise.all(
      ides.map(async (ide) => ({
        ...ide,
        installed: versions.includes(ide.version),
        changelog: await this.changelogService.hasChangelog(ide.version),
        downloading: false,
      }))
    );
  }
}
