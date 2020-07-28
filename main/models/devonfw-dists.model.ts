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

export interface DevonIdeScripts {
  version: string;
  updated: Date;
}
