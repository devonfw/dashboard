import { useBackgroundStyles } from './background.styles';

interface BackgroundProps {
  children: JSX.Element;
}

export default function Background(props: BackgroundProps): JSX.Element {
  const classes = useBackgroundStyles();

  return (
    <div className={classes.root}>
      <div className={classes.dashboardInfo}>{props.children}</div>
    </div>
  );
}
