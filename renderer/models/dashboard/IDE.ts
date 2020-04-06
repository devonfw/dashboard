export class IDE {
    public name: string;
    public logo: string;

    constructor(name: string, logo: string) {
      this.name = name;
      this.logo = logo;
    }
}

export class NullIDE extends IDE {
  constructor() {
    super('vscode', 'vscode/img');
  }
}