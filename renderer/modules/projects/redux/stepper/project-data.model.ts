interface SpecificArgs {
  [key: string]: string | boolean | null | undefined;
}

export interface ProjectData {
  name: string;
  type: string;
  path: string;
  specificArgs?: SpecificArgs;
}
