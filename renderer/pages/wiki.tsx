//<iframe [src]="url | safe" width="100%" height="100%"></iframe>
import React from 'react';
import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  frame: {
    width: '100%',
    height: '100%',
    border: 'none'
  }
});

export default function MediaCard() {
  const classes = useStyles();
  const url = 'https://devonfw.com/website/pages/docs/master.html';

  return (
    <Layout>
      <iframe src={url} className={classes.frame}></iframe>
    </Layout >
  );
}