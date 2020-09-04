import Process from '../../../../../decorators/process';
import { RendererMessage } from '../../../../../models/renderer-message';
import ChangelogService from '../changelog.service';

export default class ChangelogListener {
  private changelogService: ChangelogService;
  constructor() {
    this.changelogService = new ChangelogService();
  }

  @Process('changelog-by-version', false)
  async getChangelog(version: string): Promise<RendererMessage<string>> {
    if (!version) new RendererMessage(false, '');

    try {
      const result = await this.changelogService.getChangelog(version);
      return new RendererMessage(false, result);
    } catch (error) {
      return new RendererMessage(true, error);
    }
  }

  listen(): void {
    this.getChangelog('');
  }
}
