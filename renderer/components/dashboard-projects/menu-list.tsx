import { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import { ProjectMenuType } from '../../models/dashboard/ProjectMenuType';
import { menuStyles } from './menu-list.styles';
import { ProjectDetails } from '../../modules/projects/redux/stepper/data.model';

interface MenuListProps {
  state: ProjectMenuType;
  handleClose: () => void;
  openProjectInIde: (ide: string) => void;
  openProjectDirectory: () => void;
  deleteProject: () => void;
  project: ProjectDetails;
}

export default function MenuList(props: MenuListProps): JSX.Element {
  const classes = menuStyles();
  const [open, setOpen] = useState<boolean>(false);
  const openIdeExpandHandler = () => {
    setOpen(!open);
  };
  const handleCloseMenu = () => {
    props.handleClose();
    setOpen(false);
  };
  return (
    <Menu
      keepMounted
      open={props.state.mouseY !== null}
      anchorReference="anchorPosition"
      anchorPosition={
        props.state.mouseY !== null && props.state.mouseX !== null
          ? { top: props.state.mouseY, left: props.state.mouseX }
          : undefined
      }
      PaperProps={{
        style: {
          width: 200,
        },
      }}
      MenuListProps={{
        onMouseLeave: handleCloseMenu,
      }}
    >
      <MenuItem className={classes.menuItemRoot}>
        <List className={classes.list}>
          <ListItem onClick={openIdeExpandHandler} className={classes.listItem}>
            <ListItemText primary="Open" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List className={classes.sublist}>
              <ListItem button>
                <div onClick={() => props.openProjectInIde('vscode')}>
                  In Visual Studio Code
                </div>
              </ListItem>
              {!['', 'angular', 'node'].includes(props.project?.domain) ? (
                <>
                  <Divider />
                  <ListItem button>
                    <div onClick={() => props.openProjectInIde('eclipse')}>
                      In Eclipse
                    </div>
                  </ListItem>
                </>
              ) : null}
            </List>
          </Collapse>
        </List>
      </MenuItem>
      <Divider />
      <MenuItem className={classes.item} onClick={props.openProjectDirectory}>
        Enclosing Folder
      </MenuItem>
      <Divider />
      <MenuItem className={classes.item} onClick={props.deleteProject}>
        Delete
      </MenuItem>
    </Menu>
  );
}
