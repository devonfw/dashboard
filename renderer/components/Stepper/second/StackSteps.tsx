//import { JSXElement } from 'react';
import NgData from './angular/NgData';
import NgType from '../first/angular/NgType';
import JavaType from '../first/java/JavaType';
import NodeType from '../first/node/NodeType';

const ngStep = () => (
  <>
    <NgType></NgType>
    <NgData></NgData>
  </>
);

const javaStep = () => (
  <>
    <JavaType></JavaType>
    <NgData></NgData>
  </>
);

const nodeStep = () => (
  <>
    <NodeType></NodeType>
    <NgData></NgData>
  </>
);

const STEPS_MAP: { [key: string]: JSX.Element } = {
  ng: ngStep(),
  java: javaStep(),
  node: nodeStep(),
};

export default STEPS_MAP;