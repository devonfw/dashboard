import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Repository from '../../../modules/shared/services/github/models/repository.model';

const useStyles = makeStyles({
  card: {
    width: '100%',
    marginBottom: '1rem',
  },

  buttonsRight: {
    justifyContent: 'flex-end',
  },
});

export default function RepositoryCard(props: Repository): JSX.Element {
  const classes = useStyles();
  const { name, description } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonsRight}>
        <Button size="small">{'Copy Github URL'}</Button>
        <Button size="small" variant="contained" color="primary">
          {'Open repository'}
        </Button>
      </CardActions>
    </Card>
  );
}
