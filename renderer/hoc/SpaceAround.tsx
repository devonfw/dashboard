const styles: { [key: string]: string } = {
  padding: '2rem 0 2rem 1rem',
  backgroundColor: '#4CBDEC',
};

interface SpaceAroundProps {
  children: JSX.Element;
  bgColor?: string;
}

export default function SpaceAround(props: SpaceAroundProps): JSX.Element {
  let spaceAroundStyles = styles;

  if (props.bgColor) {
    spaceAroundStyles = { ...spaceAroundStyles, bgColor: props.bgColor };
  }

  return <div style={spaceAroundStyles}>{props.children}</div>;
}
