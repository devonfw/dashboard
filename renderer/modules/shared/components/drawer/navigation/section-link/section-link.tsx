import { useState } from 'react';
import { DrawerLink } from '../custom-drawer/drawer-links';
import { useRouter } from 'next/router';
import { useSectionLinkStyles } from './section-link.styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import NextLink from '../../../nextjs-link/NextLink';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';

interface SectionLinkProps {
  section: string;
  sectionPath: string;
  isActive: boolean;
  icon: JSX.Element;
  submenu?: DrawerLink[];
}

export default function SectionLink(props: SectionLinkProps): JSX.Element {
  const router = useRouter();
  const classes = useSectionLinkStyles();
  const activeClass = props.isActive ? classes.active : '';
  const [open, setOpen] = useState(false);

  const toggleSubmenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        button
        component={NextLink}
        href={props.sectionPath}
        onClick={props.submenu ? toggleSubmenu : undefined}
      >
        <ListItemIcon className={activeClass}>{props.icon}</ListItemIcon>
        <ListItemText className={activeClass} primary={props.section} />
        {props.submenu ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {props.submenu ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" className={classes.nested}>
            {props.submenu.map((link: DrawerLink) => (
              <SectionLink
                key={link.id}
                section={link.section}
                sectionPath={link.sectionPath}
                isActive={router.pathname == link.sectionPath}
                icon={link.icon}
                submenu={link.submenu}
              />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}
