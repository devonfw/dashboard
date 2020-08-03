//import { JSXElement } from 'react';
import NgData from './angular/NgData';
import JavaInitializer from './java/javaInitializer';
import NodeInitializer from './node/nodeInitializer';
import { Stack, stacksMap } from '../first/stacks';
import StackCard from '../../../../../components/cards/stack-card/StackCard';
import Grid from '@material-ui/core/Grid';

const ngStep = () => {
  const stack: Stack = stacksMap['angular'];

  return (
    <Grid container>
      <Grid item xs={3}>
        <StackCard
          variant={true}
          image={stack.image}
          text={stack.text}
        ></StackCard>
      </Grid>
      <Grid item xs={9}>
        <NgData></NgData>
      </Grid>
    </Grid>
  );
};

const javaStep = () => {
  const stack: Stack = stacksMap['java'];

  return (
    <>
      <div>
        <StackCard
          variant={true}
          image={stack.image}
          text={stack.text}
        ></StackCard>
      </div>
      <JavaInitializer></JavaInitializer>
    </>
  );
};

const nodeStep = () => {
  const stack: Stack = stacksMap['node'];

  return (
    <>
      <div>
        <StackCard
          variant={true}
          image={stack.image}
          text={stack.text}
        ></StackCard>
      </div>
      <NodeInitializer></NodeInitializer>
    </>
  );
};

const STEPS_MAP: { [key: string]: JSX.Element } = {
  ng: ngStep(),
  java: javaStep(),
  node: nodeStep(),
};

export default STEPS_MAP;
