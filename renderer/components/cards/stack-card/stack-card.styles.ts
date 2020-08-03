import makeStyles from '@material-ui/core/styles/makeStyles';

type Style = { [key: string]: string | Style };

const reversedColors: Style = {
  backgroundColor: '#0075B3',
  '& .MuiTypography-colorTextSecondary': {
    color: '#FFFFFF',
  },
  '& .MuiCardMedia-root': {
    filter: 'brightness(0) invert(1)',
  },
};

export const useStackCardStyles = makeStyles({
  card: {
    '& button': {
      padding: '1rem 0 0 0',
    },
    '& .MuiButtonBase-root:hover': reversedColors,
  },
  image: {
    height: 65,
    backgroundSize: 'contain',
  },
  bgColor: reversedColors,
  textCenter: {
    textAlign: 'center',
  },
});
