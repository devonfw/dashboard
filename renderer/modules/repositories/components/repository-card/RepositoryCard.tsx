import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Repository from '../../services/github/models/repository.model';
import Grid from '@material-ui/core/Grid';
import useRepositoryCardStyles from './repository-card.styles';

interface RepositoryCardProps {
  onOpen?: () => void;
  onCopy?: () => void;
}

export default function RepositoryCard(
  props: RepositoryCardProps & Repository
): JSX.Element {
  const classes = useRepositoryCardStyles();
  const { name, description } = props;

  return (
    <Card className={classes.card}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={7}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="h6" component="h2">
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" component="p">
                  {description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item xs={5}>
          <CardActions className={classes.buttonsRight}>
            <Button onClick={props.onCopy}>Copy Github URL</Button>
            <Button variant="contained" color="primary" onClick={props.onOpen}>
              Open repository
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
