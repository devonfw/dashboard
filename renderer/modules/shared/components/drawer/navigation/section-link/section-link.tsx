import { useState } from 'react';
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
import Route from '../../../../models/route.model';

interface SectionLinkProps {
  section: string;
  path: string;
  isActive: boolean;
  icon: JSX.Element;
  submenu?: Route[];
}

export default function SectionLink(props: SectionLinkProps): JSX.Element {
  const router = useRouter();
  const classes = useSectionLinkStyles();
  const activeClass = props.isActive && !props.submenu ? classes.active : '';
  const [open, setOpen] = useState(false);

  const toggleSubmenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        button
        component={NextLink}
        href={props.path}
        onClick={props.submenu ? toggleSubmenu : undefined}
      >
        <ListItemIcon className={activeClass}>{props.icon}</ListItemIcon>
        <ListItemText className={activeClass} primary={props.section} />
        {props.submenu ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      {props.submenu ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" className={classes.nested}>
            {props.submenu.map((link: Route) => (
              <SectionLink
                key={link.id}
                section={link.section}
                path={link.path}
                isActive={router.pathname == link.path}
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
