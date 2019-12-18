import React from 'react';
import Layout from '../components/Layout';
import SpaceAround from '../components/SpaceAround'
import { makeStyles } from '@material-ui/core/styles';
import IdeCard from '../components/cards/IdeCard';

const useStyles = makeStyles({
  cardsContainer: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'space-evenly'
  }
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Layout>
      <SpaceAround>
        <div className={classes.cardsContainer}>
          <IdeCard
            image="/assets/eclipse.png"
            title="Eclipse IDE"
            description="Eclipse contains a base workspace and an extensible plug-in system for customizing the environment."
          ></IdeCard>
          <IdeCard
            image="/assets/vscode.png"
            title="VS Code"
            description="Eclipse contains a base workspace and an extensible plug-in system for customizing the environment."
          ></IdeCard>
          <IdeCard
            image="/assets/intellij.png"
            title="Intellij"
            description="Its powerful static code analysis and ergonomic design makes development a productive and enjoyable experience."
          ></IdeCard>
        </div>
      </SpaceAround>
    </Layout >
  );
}