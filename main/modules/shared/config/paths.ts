import path from 'path';
import platform from 'os';

export const licensePath = path.resolve(
  platform.homedir(),
  '.devon',
  '.license.agreement'
);

export const devonFilePath = path.resolve(
  platform.homedir(),
  '.devon',
  'projectinfo.json'
);

export const idePathsFilePath = path.resolve(
  process.env.USERPROFILE,
  '.devon',
  'ide-paths'
);
