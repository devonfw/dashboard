import Renderer from '../../../shared/services/renderer/renderer.service';

export default class ChangelogService {
  private renderer: Renderer;

  constructor() {
    this.renderer = new Renderer();
  }

  getChangelog(version: string): Promise<string> {
    return this.renderer.send<string>('changelog-by-version', version);
  }
}
