import React from 'react';
import Layout from '../modules/shared/hoc/Layout';
import SpaceAround from '../modules/shared/hoc/SpaceAround';
import { makeStyles } from '@material-ui/core/styles';
import ides from '../modules/ides/ides';
import IdeCard from '../modules/ides/components/ide-card/ide-card';

const useStyles = makeStyles({
  cardsContainer: {
    display: 'grid',
    gridGap: 16,
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  },
});

export default function IDES(): JSX.Element {
  const classes = useStyles();

  return (
    <Layout>
      <SpaceAround>
        <div className={classes.cardsContainer}>
          {ides.map((ide) => (
            <IdeCard key={ide.name} {...ide} />
          ))}
        </div>
      </SpaceAround>
    </Layout>
  );
}
