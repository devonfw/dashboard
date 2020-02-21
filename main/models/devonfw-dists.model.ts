export interface IdeConfig {
    basepath: string;
    workspaces: string;
    commands: string;
}

export interface IdeDistribution {
    id: string;
    ideConfig: IdeConfig;
}

export interface DevonfwConfig {
    distributions: IdeDistribution[];
}