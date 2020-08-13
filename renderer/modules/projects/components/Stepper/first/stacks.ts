type Technologies = 'angular' | 'java' | 'node';

export const stackKeys: Technologies[] = ['angular', 'java', 'node'];

type StackMap = {
  [stackKey in Technologies]: Stack;
};

export interface Stack {
  id: number;
  image: string;
  text: string;
  command: string;
}

export const stacksMap: StackMap = {
  angular: {
    id: 0,
    image: '/assets/stacks/angular-logo.svg',
    text: 'DEVON ANGULAR',
    command: 'angular',
  },
  java: {
    id: 1,
    image: '/assets/stacks/java-logo.svg',
    text: 'DEVON JAVA',
    command: 'java',
  },
  node: {
    id: 2,
    image: '/assets/stacks/node-logo.svg',
    text: 'DEVON NODE',
    command: 'node',
  },
};
