import { useUpgradeBannerStyles } from './upgrade-banner.styles';
import Info from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import DownloadDevonfw from '../download-devonfw/download-devonfw';

export interface UpgradeBannerProps {
  version: string;
  infoText: string;
}

export default function UpgradeBanner(props: UpgradeBannerProps): JSX.Element {
  const classes = useUpgradeBannerStyles();
  const DASHBOARD_DOWNLOAD_URL =
    'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.devonfw.tools.ide&a=devonfw-ide-scripts&v=LATEST&p=tar.gz';

  return (
    <div className={classes.upgrade}>
      <div>
        <div>
          <h4 className={classes.uppercase}>
            Latest version {props.version}
            <Tooltip title={props.infoText} placement="top" arrow>
              <Info fontSize="small" />
            </Tooltip>
          </h4>
          <div>Get IDE fixes and more Features </div>
        </div>
        <div className={classes.updateAction}>
          <DownloadDevonfw url={DASHBOARD_DOWNLOAD_URL}>
            UPDATE NOW
          </DownloadDevonfw>
        </div>
      </div>
    </div>
  );
}
