import { DevonIdeScript } from '../../../../models/devonfw-dists.model';
import formatDate from '../../../shared/utils/date-formatter';

const DEVONFW_VERSIONS_URL =
  'https://search.maven.org/classic/solrsearch/select?q=g%3A%22com.devonfw.tools.ide%22%20AND%20a%3A%22devonfw-ide-scripts%22&rows=20&core=gav&wt=json';
const LATEST_DEVONFW_VERSION_URL =
  'https://search.maven.org/classic/solrsearch/select?q=a%3A%22devonfw-ide-scripts%22&rows=20&wt=json';

export default class DevonfwIdesService {
  async getDevonfwIDEs(): Promise<DevonIdeScript[]> {
    try {
      return await this.fetchDevonfwIDEs();
    } catch (error) {
      return [];
    }
  }

  async getLatestDevonfwIDE(): Promise<DevonIdeScript> {
    try {
      return await this.fetchLatestDevonfwIde();
    } catch (error) {
      throw new Error(`error: ${error.toString()}`);
    }
  }

  private async fetchDevonfwIDEs(): Promise<DevonIdeScript[]> {
    const idesJson = await fetch(DEVONFW_VERSIONS_URL);
    const ides = await idesJson.json();
    const docs: { v: string; timestamp: string }[] = ides.response.docs;

    const devonfwIdes: DevonIdeScript[] = await Promise.all(
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

  private devonfwIdeScript(version: string, timestamp: string): DevonIdeScript {
    return {
      id: version,
      version: version,
      updated: formatDate(timestamp),
    };
  }
}
