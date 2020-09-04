import { Styles } from '../types/types';

const styles: Styles = {
  padding: '2rem 2rem 2rem 2rem',
};

interface SpaceAroundProps {
  children: JSX.Element | JSX.Element[];
  bgColor?: string;
  top?: number;
}

export default function SpaceAround(props: SpaceAroundProps): JSX.Element {
  let spaceAroundStyles = styles;

  if (props.bgColor) {
    spaceAroundStyles = {
      ...spaceAroundStyles,
      backgroundColor: props.bgColor,
    };
  }

  if (props.top) {
    spaceAroundStyles = {
      ...spaceAroundStyles,
      paddingTop: `${props.top}rem`,
    };
  }

  return <div style={spaceAroundStyles}>{props.children}</div>;
}
