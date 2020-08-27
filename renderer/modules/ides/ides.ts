interface IDE {
  name: string;
  image: string;
  title: string;
  description: string;
}

const ides: IDE[] = [
  {
    name: 'eclipse',
    image: '/static/assets/ides/eclipse.svg',
    title: 'Eclipse IDE',
    description:
      'Eclipse contains a base workspace and an extensible plug-in system for customizing the environment.',
  },

  {
    name: 'intellij',
    image: '/static/assets/ides/intellij.svg',
    title: 'Intellij',
    description:
      'Its powerful static code analysis and ergonomic design makes development a productive and enjoyable experience.',
  },
  {
    name: 'vscode',
    image: '/static/assets/ides/vscode.svg',
    title: 'VS Code',
    description:
      'Eclipse contains a base workspace and an extensible plug-in system for customizing the environment.',
  },
];

export default ides;
