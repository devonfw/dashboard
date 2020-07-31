import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NextLink from '../../../nextjs-link/NextLink';
import { useSectionLinkStyles } from './section-link.styles';

interface SectionLinkProps {
  section: string;
  sectionPath: string;
  isActive: boolean;
  icon: JSX.Element;
}

export default function SectionLink(props: SectionLinkProps): JSX.Element {
  const active: string = useSectionLinkStyles().active;
  const activeClass: string = props.isActive ? active : '';

  return (
    <ListItem button component={NextLink} href={props.sectionPath}>
      <ListItemIcon className={activeClass}>{props.icon}</ListItemIcon>
      <ListItemText className={activeClass} primary={props.section} />
    </ListItem>
  );
}
