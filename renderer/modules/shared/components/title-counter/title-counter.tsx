import { HTMLAttributes } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useTitleCounterStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      alignItems: 'center',
    },
    counter: {
      marginRight: theme.spacing(1),
    },
  })
);

interface TitleCounterProps {
  count: number;
  children: JSX.Element | string;
}

export default function TitleCounter(
  props: TitleCounterProps & HTMLAttributes<HTMLHeadingElement>
): JSX.Element {
  const classes = useTitleCounterStyles();
  return (
    <Typography
      className={`${classes.title} ${props.className}`}
      variant="h5"
      component="h2"
    >
      <Typography className={classes.counter} variant="h4" component="span">
        {props.count}
      </Typography>
      {props.children}
    </Typography>
  );
}
