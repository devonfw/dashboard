import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
  devonfwIde: string;
}

export default function IdeCard(props: IdeCardProps): JSX.Element {
  const { image, title, description, name, devonfwIde } = props;
  const [loading, setLoading] = useState(false);
  const classes = useIdeCardStyles();

  const handleOpenIde = async () => {
    setLoading(true);
    await new MessageSenderService().openIDE(name, devonfwIde);
    setLoading(false);
  };

  return (
    <Card className={classes.card}>
      <img
        className={`${classes.media} ${classes.containImg}`}
        src={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2" align="center">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          align="center"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <AcceptButton onClick={handleOpenIde}>Open</AcceptButton>
        {loading ? <CircularProgress size={28} /> : null}
      </CardActions>
    </Card>
  );
}
