import { makeStyles, createStyles } from '@material-ui/core/styles';

const useFormControlGenderStyles = makeStyles(() =>
  createStyles({
    radioGroup: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    radioImage: {
      width: '210px',
      height: '140px',
      position: 'relative',
      left: '-30px',
      cursor: 'pointer',
    },
  })
);

export default useFormControlGenderStyles;
