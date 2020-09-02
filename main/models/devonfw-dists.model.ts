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
  installed: boolean;
  changelog: string | null;
  downloading: boolean;
}
