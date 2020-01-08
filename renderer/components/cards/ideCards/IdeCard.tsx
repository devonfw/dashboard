import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    margin: '0 1rem 1rem 0',
    paddingTop: '1rem',
  },
  media: {
    height: 120,
  },

  containImg: {
    'background-size': 'contain',
    margin: '0 1rem',
  },

  spinner: {
    height: '28px !important',
    width: '28px !important',
  },
});

interface IdeCardsProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
  loading: boolean;
}

export default function IdeCard(props: IdeCardsProps) {
  const classes = useStyles();
  const { image, title, description, onClick, loading } = props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={`${classes.media} ${classes.containImg}`}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Open
        </Button>
        { loading ? <CircularProgress className={classes.spinner} /> : null }
      </CardActions>
    </Card>
  );
}
