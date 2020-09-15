import { IdeVersions } from '../../../../models/devonfw-dists.model';
import formatDate from '../../../shared/utils/date-formatter';
import fetch from 'cross-fetch';

const DEVONFW_VERSIONS_URL =
  'https://search.maven.org/classic/solrsearch/select?q=g%3A%22com.devonfw.tools.ide%22%20AND%20a%3A%22devonfw-ide-scripts%22&rows=20&core=gav&wt=json';
const LATEST_DEVONFW_VERSION_URL =
  'https://search.maven.org/classic/solrsearch/select?q=a%3A%22devonfw-ide-scripts%22&rows=20&wt=json';

export default class DevonfwIdesService {
  async getDevonfwIDEs(): Promise<IdeVersions[]> {
    try {
      return await this.fetchDevonfwIDEs();
    } catch (error) {
      return [];
    }
  }

  async getLatestDevonfwIDE(): Promise<IdeVersions> {
    try {
      return await this.fetchLatestDevonfwIde();
    } catch (error) {
      throw new Error(`error: ${error.toString()}`);
    }
  }

  private async fetchDevonfwIDEs(): Promise<IdeVersions[]> {
    const idesJson = await fetch(DEVONFW_VERSIONS_URL);
    const ides = await idesJson.json();
    const docs: { v: string; timestamp: string }[] = ides.response.docs;

    const devonfwIdes: IdeVersions[] = await Promise.all(
      docs.map(async (ide) => this.devonfwIdeScript(ide.v, ide.timestamp))
    );

    return devonfwIdes;
  }

  private async fetchLatestDevonfwIde() {
    const idesJson = await fetch(LATEST_DEVONFW_VERSION_URL);
    const ides = await idesJson.json();
    const latestIde = ides.response.docs[0];

    return this.devonfwIdeScript(latestIde.latestVersion, latestIde.timestamp);
  }

  private devonfwIdeScript(version: string, timestamp: string): IdeVersions {
    return {
      version: version,
      updated: formatDate(timestamp),
      url: this.getIdeUrl(version),
      changelog: false,
    };
  }

  private getIdeUrl(version: string): string {
    return (
      'https://search.maven.org/classic/remotecontent?filepath=com/devonfw/tools/ide/devonfw-ide-scripts/' +
      version +
      '/devonfw-ide-scripts-' +
      version +
      '.tar.gz'
    );
  }
}
