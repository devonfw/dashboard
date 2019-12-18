import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Repository from '../../models/repository.model';

/*
<mat-card-header><mat-card-title>{{repo.name}}</mat-card-title></mat-card-header>
    <mat-card-content>
      <mat-card-subtitle>{{repo.description}}</mat-card-subtitle>
      <div class="repo-item-actions">
        <button mat-raised-button color="primary" (click)="copyURL(repo)">Copy Git URL</button>
        <button mat-raised-button (click)="openRepo(repo)">Open Repository</button>
      </div>
    </mat-card-content>
*/

const useStyles = makeStyles({
  card: {
    width: '100%',
    marginBottom: '1rem',
  },

  buttonsRight: {
    justifyContent: 'flex-end',
  }
});

export default function RepositoryCard(props: Repository) {
  const classes = useStyles();
  const { name, description } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {/*<CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />*/}
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
        <Button size="small">
          {'Copy Github URL'}
        </Button>
        <Button size="small"variant="contained" color="primary">
          {'Open repository'}
        </Button>
      </CardActions>
    </Card>
  );
}