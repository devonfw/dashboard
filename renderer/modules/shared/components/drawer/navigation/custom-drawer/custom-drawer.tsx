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
      <List>
        {drawerLinks.map((link: DrawerLink) => {
          return (
            <SectionLink
              key={link.id}
              section={link.section}
              sectionPath={link.sectionPath}
              isActive={router.pathname == link.sectionPath}
              icon={link.icon}
            ></SectionLink>
          );
        })}
      </List>
      <UpgradeBanner></UpgradeBanner>
    </div>
  );
}
