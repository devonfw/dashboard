import { HTMLAttributes } from 'react';
import useButtonLinkStyles from './button-link.styles';

export default function ButtonLink(
  props: HTMLAttributes<HTMLButtonElement>
): JSX.Element {
  const classes = useButtonLinkStyles();

  return (
    <button className={classes.link} {...props}>
      Consolidated list of features
    </button>
  );
}
