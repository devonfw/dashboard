import makeStyles from '@material-ui/core/styles/makeStyles';
import { ComposedStyles } from '../../../modules/shared/types/types';

const reversedColors: ComposedStyles = {
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
    'box-sizing': 'border-box',
    '& button': {
      padding: '1rem 0 0 0',
    },
    '& .MuiButtonBase-root:hover': reversedColors,
  },
  image: {
    height: 65,
    backgroundSize: 'contain',
    margin: '0 1vw 0 1vw',
  },
  bgColor: reversedColors,
  textCenter: {
    textAlign: 'center',
  },
});
