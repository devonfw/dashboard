import { Theme } from '@material-ui/core/styles/createMuiTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';

const reversedColors = (theme: Theme) => ({
  backgroundColor: theme.palette.primary.main,
  '& .MuiTypography-colorTextSecondary': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiCardMedia-root': {
    filter: 'brightness(0) invert(1)',
  },
});

export const useStackCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      'box-sizing': 'border-box',
      '& button': {
        padding: '1rem 0 0 0',
      },
      '& .MuiButtonBase-root:hover': reversedColors(theme),
    },
    image: {
      height: 65,
      backgroundSize: 'contain',
      margin: '0 1vw 0 1vw',
    },
    bgColor: reversedColors(theme),
    textCenter: {
      textAlign: 'center',
    },
  })
);
