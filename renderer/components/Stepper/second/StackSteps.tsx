//import { JSXElement } from 'react';
import NgData from './angular/NgData';
import NgType from '../first/angular/NgType';
import JavaType from '../first/java/JavaType';
import NodeType from '../first/node/NodeType';
import JavaInitializer from '../second/java/JavaInitializer';
import NodeInitializer from '../second/node/NodeInitializer';

const ngStep = () => (
  <>
    <NgType variant={true}></NgType>
    <NgData></NgData>
  </>
);

const javaStep = () => (
  <>
    <JavaType variant={true}></JavaType>
    <JavaInitializer></JavaInitializer>
  </>
);

const nodeStep = () => (
  <>
    <NodeType variant={true}></NodeType>
    <NodeInitializer></NodeInitializer>
  </>
);

const STEPS_MAP: { [key: string]: JSX.Element } = {
  ng: ngStep(),
  java: javaStep(),
  node: nodeStep(),
};

export default STEPS_MAP;