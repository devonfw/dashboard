import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import devonfwIdeAccessibilityContentStyles from './devonfw-ide-accessibilty-styles';

interface DevonfwIdeAccessibilityContentProps {
  close: () => void;
}

export default function DevonfwIdeAccessibilityContent(
  props: DevonfwIdeAccessibilityContentProps
): JSX.Element {
  const classes = devonfwIdeAccessibilityContentStyles();

  const close = () => {
    props.close();
  };

  return (
    <div>
      <Typography variant="h6" component="h2" className={classes.title}>
        Get devonfw-ide installed to access all Functionalities
      </Typography>

      <Typography>
        Install devonfw-ide to access (add new project button, open button)
        functionalities. A devonfw instance to choose will only enable all
        sections and should be usable.
      </Typography>

      <Typography>
        <Button color="primary" className={classes.mt} onClick={close}>
          Ok, got it!
        </Button>
      </Typography>
    </div>
  );
}
