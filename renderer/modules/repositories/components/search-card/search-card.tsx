import useSearchCardStyles from './search-card.styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions/CardActions';

interface SearchCardProps {
  children: JSX.Element;
}

export default function SearchCard(props: SearchCardProps): JSX.Element {
  const classes = useSearchCardStyles();

  return (
    <Card className={classes.card}>
      <CardActions>{props.children}</CardActions>
    </Card>
  );
}
