import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useStackCardStyles } from './stack-card.styles';

interface StackProps {
  image: string;
  text: string;
  variant: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export default function StackCard(props: StackProps): JSX.Element {
  const classes = useStackCardStyles();
  const { image, text, variant, onClick } = props;
  const cardClasses = `${classes.card} ${variant ? classes.bgColor : ''}`;

  return (
    <Card className={cardClasses} onClick={onClick}>
      <CardActionArea>
        <CardMedia className={classes.image} image={image} title={text} />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.textCenter}
          >
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
