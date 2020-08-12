export function dataToCommandArgs(args: SpecificArgs): string[] {
  if (!args) {
    return [];
  }

  return Object.keys(args).map((key: string) => {
    const argValue = args[key];

    if (argValue === null) {
      return `${key}`;
    }

    return `${key}=${argValue}`;
  });
}

interface SpecificArgs {
  [key: string]: string | boolean | null;
}

export interface ProjectData {
  name: string;
  path: string;
  type: string;

  specificArgs?: SpecificArgs;
}
