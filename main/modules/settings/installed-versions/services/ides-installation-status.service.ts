import { IdeVersions } from '../../../../models/devonfw-dists.model';
import ChangelogService from './changelog.service';
import DevonInstancesService from '../../../../services/devon-instances/devon-instances.service';
import DevonfwIdesService from './devonfw-ides.service';

export default class IDEsInstallationStatus {
  private changelogService: ChangelogService;

  constructor(
    private versions: DevonInstancesService,
    private idesRetriever: DevonfwIdesService
  ) {
    this.changelogService = new ChangelogService();
  }

  async getDevonfwIDEsStatus(
    onNotify: (instances: IdeVersions) => void
  ): Promise<void> {
    const versions = await this.versions.getInstalledVersions();
    const ides = await this.idesRetriever.getDevonfwIDEs();

    for (const ide of ides) {
      onNotify({
        ...ide,
        installed: versions.includes(ide.version),
        changelog: await this.changelogService.hasChangelog(ide.version),
        downloading: false,
      });
    }
  }
}
