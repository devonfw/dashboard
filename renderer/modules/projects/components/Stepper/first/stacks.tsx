import NgData from '../second/angular/NgData';
import JavaInitializer from '../second/java/javaInitializer';
import NodeInitializer from '../second/node/nodeInitializer';

export type Technologies = 'angular' | 'java' | 'node';

export const stackKeys: Technologies[] = ['angular', 'java', 'node'];

type StackMap = {
  [stackKey in Technologies]: Stack;
};

type StackJSXMap = {
  [stackKey in Technologies]: JSX.Element;
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
    image: '/static/assets/stacks/angular-logo.svg',
    text: 'DEVON ANGULAR',
    command: 'angular',
  },
  java: {
    id: 1,
    image: '/static/assets/stacks/java-logo.svg',
    text: 'DEVON JAVA',
    command: 'java',
  },
  node: {
    id: 2,
    image: '/static/assets/stacks/node-logo.svg',
    text: 'DEVON NODE',
    command: 'node',
  },
};

export const stacksJSXMap: StackJSXMap = {
  angular: <NgData></NgData>,
  java: <JavaInitializer></JavaInitializer>,
  node: <NodeInitializer></NodeInitializer>,
};
