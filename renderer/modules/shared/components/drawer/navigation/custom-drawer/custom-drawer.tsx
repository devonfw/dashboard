import { useRouter } from 'next/router';
import { drawerLinks, DrawerLink } from './drawer-links';
import List from '@material-ui/core/List';
import SectionLink from '../section-link/section-link';
import responsiveDrawerStyle from '../../drawer.style';
import UpgradeBanner from '../../../upgrade-banner/upgrade-banner';
import ProfilePicture from '../../../profile-picture/profile-picture';

interface CustomDrawerProps {
  classes: ReturnType<typeof responsiveDrawerStyle>;
}

export default function CustomDrawer(props: CustomDrawerProps): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <div className={props.classes.toolbar} />
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
      <UpgradeBanner></UpgradeBanner>
    </div>
  );
}
