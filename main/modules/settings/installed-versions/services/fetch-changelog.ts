const urlForVersion = (version: string) =>
  `https://raw.githubusercontent.com/devonfw/ide/release/${version}/CHANGELOG.asciidoc`;

// '2020.08.001'
export default async function getChangelog(version: string): Promise<string> {
  try {
    const res = await fetch(urlForVersion(version));

    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }

    const changelog = await res.text();
    return changelog;
  } catch (err) {
    return null;
  }
}
