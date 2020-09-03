const urlForVersion = (version: string) =>
  `https://raw.githubusercontent.com/devonfw/ide/release/${version}/CHANGELOG.asciidoc`;

export default class ChangelogService {
  async getChangelog(version: string): Promise<string> {
    try {
      const res = await fetch(urlForVersion(version));

      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      const changelog = await res.text();
      return changelog;
    } catch (err) {
      throw new Error('Changelog not found');
    }
  }

  async hasChangelog(version: string): Promise<boolean> {
    try {
      return !!(await this.getChangelog(version));
    } catch (error) {
      return false;
    }
  }
}
