interface IDE {
  name: string;
  image: string;
  title: string;
  description: string;
}

const ides: IDE[] = [
  {
    name: 'eclipse',
    image: '/assets/ides/eclipse.svg',
    title: 'Eclipse IDE',
    description:
      'Eclipse contains a base workspace and an extensible plug-in system for customizing the environment.',
  },

  {
    name: 'intellij',
    image: '/assets/ides/intellij.svg',
    title: 'Intellij',
    description:
      'Its powerful static code analysis and ergonomic design makes development a productive and enjoyable experience.',
  },
  {
    name: 'vscode',
    image: '/assets/ides/vscode.svg',
    title: 'VS Code',
    description:
      'Eclipse contains a base workspace and an extensible plug-in system for customizing the environment.',
  },
];

export default ides;
