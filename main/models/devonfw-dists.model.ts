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
  version: string;
  path?: string;
  updated?: string;
}

export interface IdeVersions extends DevonIdeScript {
  url?: string;
  changelog: boolean;
}
