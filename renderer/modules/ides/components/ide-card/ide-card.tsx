import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MessageSenderService from '../../../shared/services/renderer/messageSender.service';
import AcceptButton from '../../../shared/components/accept-button/accept-button';
import useIdeCardStyles from './ide-card.styles';

interface IdeCardProps {
  name: string;
  image: string;
  title: string;
  description: string;
}

export default function IdeCard(props: IdeCardProps): JSX.Element {
  const { image, title, description, name } = props;
  const [loading, setLoading] = useState(false);
  const classes = useIdeCardStyles();

  const handleOpenIde = async () => {
    setLoading(true);
    await new MessageSenderService().openIDE(name);
    setLoading(false);
  };

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
        <AcceptButton onClick={handleOpenIde}>Open</AcceptButton>
        {loading ? <CircularProgress size={28} /> : null}
      </CardActions>
    </Card>
  );
}
