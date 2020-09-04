import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { drawerLinks } from './drawer-links';
import List from '@material-ui/core/List';
import SectionLink from '../section-link/section-link';
import useDawerStyles from '../../drawer.style';
import UpgradeBanner, {
  UpgradeBannerProps,
} from '../../../upgrade-banner/upgrade-banner';
import ProfilePicture from '../../../profile-picture/profile-picture';
import { IpcRendererEvent } from 'electron';
import Route from '../../../../models/route.model';

interface CustomDrawerProps {
  classes: ReturnType<typeof useDawerStyles>;
}

interface DevonUpdateResponse {
  updateAvailable: boolean;
  latestLocalVersion: string;
  latestAvailableVersion: string;
}

export default function CustomDrawer(props: CustomDrawerProps): JSX.Element {
  const router = useRouter();
  const initialProps: UpgradeBannerProps = {
    version: '',
    infoText: '',
  };
  const [displayUpgradeBanner, setDisplayUpgradeBanner] = useState(false);
  const [upgradeBannerProps, setUpgradeBannerProps] = useState<
    UpgradeBannerProps
  >(initialProps);

  const getLatesDevonIdeVersion = (): void => {
    global.ipcRenderer.send('find:checkForUpdates');
    global.ipcRenderer.on(
      'get:checkForUpdates',
      (_: IpcRendererEvent, data: DevonUpdateResponse) => {
        if (data.updateAvailable) {
          const props: UpgradeBannerProps = {
            version: data.latestAvailableVersion,
            infoText:
              'Latest version installed in your system is ' +
              data.latestLocalVersion,
          };
          setDisplayUpgradeBanner(true);
          setUpgradeBannerProps({ ...props });
        }
      }
    );
  };

  useEffect(() => {
    getLatesDevonIdeVersion();
    return () => {
      global.ipcRenderer.removeAllListeners('get:checkForUpdates');
    };
  }, []);

  return (
    <div>
      <div className={props.classes.topSpace} />
      <ProfilePicture></ProfilePicture>
      <List component="nav">
        {drawerLinks.map((link: Route) => {
          return (
            <SectionLink
              key={link.id}
              section={link.section}
              path={link.path}
              isActive={router.pathname.startsWith(link.path)}
              icon={link.icon}
              submenu={link.submenu}
            ></SectionLink>
          );
        })}
      </List>
      {displayUpgradeBanner ? (
        <UpgradeBanner
          version={upgradeBannerProps.version}
          infoText={upgradeBannerProps.infoText}
        ></UpgradeBanner>
      ) : null}
    </div>
  );
}
