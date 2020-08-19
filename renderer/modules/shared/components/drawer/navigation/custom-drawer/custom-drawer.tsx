import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { drawerLinks, DrawerLink } from './drawer-links';
import List from '@material-ui/core/List';
import SectionLink from '../section-link/section-link';
import useDawerStyles from '../../drawer.style';
import UpgradeBanner, {
  UpgradeBannerProps,
} from '../../../upgrade-banner/upgrade-banner';
import ProfilePicture from '../../../profile-picture/profile-picture';
import { IpcRendererEvent } from 'electron';

interface CustomDrawerProps {
  classes: ReturnType<typeof useDawerStyles>;
}

interface IdeDistribution {
  id: string;
  ideConfig: {
    basepath: string;
    workspaces: string;
    commands: string;
    version: string;
  };
}

interface DevonIdeScripts {
  version: string;
  updated: Date;
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

  const getLocalLatestVersion = (versions: string[]): string => {
    const numericVersions = versions.map((v) => {
      return +v.split('.').join(''); // for input "2020.04.001" it will return 202004001
    });
    const maxVersion = Math.max(...numericVersions); // for input [202008001, 202004002, 202004004] it will return 202008001
    const latestLocalVersion = versions.filter(
      (v) => +v.split('.').join('') === maxVersion
    );
    return latestLocalVersion[0];
  };

  const updateRequired = (
    localVersions: string[],
    latestVersion: string
  ): void => {
    if (!localVersions.includes(latestVersion)) {
      const props: UpgradeBannerProps = {
        version: latestVersion,
        infoText:
          'Latest version installed in your system is ' +
          getLocalLatestVersion(localVersions),
      };
      setDisplayUpgradeBanner(true);
      setUpgradeBannerProps({ ...props });
    }
  };

  const getLocalInstalledVersions = (mavenLatestVersion: string): void => {
    global.ipcRenderer.send('find:devonfwInstances');
    global.ipcRenderer.on(
      'get:devoninstances',
      (_: IpcRendererEvent, data: IdeDistribution[]) => {
        if (data) {
          const localVersions = data.map((i) => i.ideConfig.version);
          updateRequired(localVersions, mavenLatestVersion);
        }
      }
    );
  };

  const getLatesDevonIdeVersion = (): void => {
    global.ipcRenderer.send('find:latestDevonIdeScript');
    global.ipcRenderer.on(
      'get:latestDevonIdeScript',
      (_: IpcRendererEvent, data: DevonIdeScripts) => {
        if (data) getLocalInstalledVersions(data.version);
      }
    );
  };

  useEffect(() => {
    getLatesDevonIdeVersion();
    return () => {
      global.ipcRenderer.removeAllListeners('get:latestDevonIdeScript');
      global.ipcRenderer.removeAllListeners('get:devoninstances');
      global.ipcRenderer.removeAllListeners('download progress');
      global.ipcRenderer.removeAllListeners('download completed');
    };
  }, []);

  return (
    <div>
      <div className={props.classes.topSpace} />
      <ProfilePicture></ProfilePicture>
      <List component="nav">
        {drawerLinks.map((link: DrawerLink) => {
          return (
            <SectionLink
              key={link.id}
              section={link.section}
              sectionPath={link.sectionPath}
              isActive={router.pathname == link.sectionPath}
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
