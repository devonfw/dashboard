import path from 'path';
import platform from 'os';

const DEVON_DIR = path.resolve(platform.homedir(), '.devon');

export const idePathsFilePath = path.resolve(DEVON_DIR, 'ide-paths');

export const devonFilePath = path.resolve(DEVON_DIR, 'projectinfo.json');

export const licensePath = path.resolve(DEVON_DIR, '.license.agreement');

export const profileFilePath = path.resolve(
  DEVON_DIR,
  'dashboard-profile.json'
);
