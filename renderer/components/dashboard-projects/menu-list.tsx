import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ProjectMenuType } from '../../models/dashboard/ProjectMenuType';

export default function MenuList(props: {
  state: ProjectMenuType;
  handleClose: () => void;
  openProjectInIde: () => void;
  openProjectDirectory: () => void;
  deleteProject: () => void;
}): JSX.Element {
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
      MenuListProps={{
        onMouseLeave: props.handleClose,
      }}
    >
      <MenuItem onClick={props.openProjectInIde}>Show in IDE</MenuItem>
      <MenuItem onClick={props.openProjectDirectory}>Enclosing Folder</MenuItem>
      <MenuItem onClick={props.deleteProject}>Delete</MenuItem>
    </Menu>
  );
}
