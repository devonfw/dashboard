import { Styles } from '../types/types';

const styles: Styles = {
  padding: '2rem 2rem 2rem 2rem',
};

interface SpaceAroundProps {
  children: JSX.Element;
  bgColor?: string;
}

export default function SpaceAround(props: SpaceAroundProps): JSX.Element {
  let spaceAroundStyles = styles;

  if (props.bgColor) {
    spaceAroundStyles = {
      ...spaceAroundStyles,
      backgroundColor: props.bgColor,
    };
  }

  return <div style={spaceAroundStyles}>{props.children}</div>;
}
