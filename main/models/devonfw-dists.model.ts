export interface IdeConfig {
  basepath: string;
  workspaces: string;
  commands: string;
  version: string;
}

export interface IdeDistribution {
  id: string;
  ideConfig: IdeConfig;
}

export interface DevonfwConfig {
  distributions: IdeDistribution[];
}

export interface DevonIdeScript {
  id: string;
  version: string;
  updated: string;
}

export interface IdeVersions extends DevonIdeScript {
  changelog: boolean;
  downloading: boolean;
  installed: boolean;
}

export interface InstalledVersions {
  version: string;
  path?: string;
  updated: string;
  url?: string;
}
