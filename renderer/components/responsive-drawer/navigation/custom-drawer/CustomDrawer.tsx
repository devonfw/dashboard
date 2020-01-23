import NextLink from '../nextjs-link/NextLink';
import Divider from '@material-ui/core/Divider';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';

const CustomDrawer = (props: {classes: any}) => (
    <div>
      <div className={props.classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={NextLink} href="/home">
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={NextLink} href="/start">
          <ListItemIcon>
            <CreateNewFolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='New project' />
        </ListItem>
        <ListItem button component={NextLink} href="/ides">
          <ListItemIcon>
            <DesktopWindowsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='IDE' />
        </ListItem>
        <ListItem button component={NextLink} href="/repositories">
          <ListItemIcon>
            <StorageOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Repositories'/>
        </ListItem>
        <ListItem button component={NextLink} href="/about">
          <ListItemIcon>
            <BuildOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Installed tools' />
        </ListItem>
        <ListItem button component={NextLink} href="/wiki">
          <ListItemIcon>
            <DescriptionOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Wiki' />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Configurator' />
        </ListItem>
      </List>
    </div>
  );

export default CustomDrawer;