import { IdeVersions } from '../../../../models/devonfw-dists.model';
import ChangelogService from './changelog.service';
import DevonInstancesService from '../../../../services/devon-instances/devon-instances.service';
import DevonfwIdesService from './devonfw-ides.service';
import formatDate from '../../../shared/utils/date-formatter';

export default class IDEsInstallationStatus {
  private changelogService: ChangelogService;

  constructor(
    private localIDEs: DevonInstancesService,
    private idesRetriever: DevonfwIdesService
  ) {
    this.changelogService = new ChangelogService();
  }

  async getDevonfwIDEsStatus(
    onNotify: (instances: IdeVersions) => void
  ): Promise<void> {
    const localIDEs = await this.localIDEs.getInstalledDevonfwIDEs();
    const ides = await this.idesRetriever.getDevonfwIDEs();

    for (const localIDE of localIDEs) {
      onNotify({
        ...localIDE,
        updated: formatDate(
          ides.find((ide) => ide.version === localIDE.version).updated
        ),
        changelog: await this.changelogService.hasChangelog(localIDE.version),
      });
    }

    for (const ide of ides) {
      onNotify({
        ...ide,
        changelog: await this.changelogService.hasChangelog(ide.version),
      });
    }
  }
}
