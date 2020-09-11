import Box, { BoxProps } from '@material-ui/core/Box';

interface SpaceAroundProps {
  bgcolor?: string;
}

export default function SpaceAround(
  props: SpaceAroundProps & BoxProps
): JSX.Element {
  return (
    <Box display="flex" flexDirection="column" height={1} p={4} {...props}>
      {props.children}
    </Box>
  );
}
