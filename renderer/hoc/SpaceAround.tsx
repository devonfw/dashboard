const styles: { [key: string]: string } = {
  padding: '2rem 0 2rem 1rem',
  backgroundColor: '#4CBDEC',
};

interface SpaceAroundProps {
  children: any;
  bgColor?: string;
}

export default function SpaceAround(props: SpaceAroundProps) {
  let spaceAroundStyles = styles;

  if (props.bgColor) {
    spaceAroundStyles = { ...spaceAroundStyles, bgColor: props.bgColor };
  }

  return <div style={spaceAroundStyles}>{props.children}</div>;
}
