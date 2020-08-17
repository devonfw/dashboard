import { useUpgradeBannerStyles } from './upgrade-banner.styles';
import Info from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';

export default function UpgradeBanner(): JSX.Element {
  const classes = useUpgradeBannerStyles();
  return (
    <div className={classes.upgrade}>
      <div>
        <div>
          <h4 className={classes.uppercase}>
            Latest version 3.0.1 <Info />
          </h4>
          <div>Get IDE fixes and more Features </div>
        </div>
        <div className={classes.updateAction}>
          <Button variant="contained" color="primary" size="large">
            UPDATE NOW
          </Button>
        </div>
      </div>
    </div>
  );
}
