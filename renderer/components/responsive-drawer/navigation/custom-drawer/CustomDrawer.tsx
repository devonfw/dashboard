import NextLink from '../nextjs-link/NextLink';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Info from '@material-ui/icons/Info';
import { useRouter } from 'next/router';
import responsiveDrawerStyle from '../../responsiveDrawer.style';

const useStyles = makeStyles({
  active: {
    color: '#0075B3',
    fontWeight: 'bold',
  },
});

interface CustomDrawerProps {
  classes: ReturnType<typeof responsiveDrawerStyle>;
}

export default function CustomDrawer(props: CustomDrawerProps): JSX.Element {
  const router = useRouter();
  const classes = useStyles();

  return (
    <div>
      <div className={props.classes.toolbar} />
      <div className={props.classes.customDrawerContainer}>
        <Card className={props.classes.customDrawerRoot}>
          <CardMedia
            className={props.classes.customDrawerCover}
            image="/assets/photo.png"
            title="User"
          />
          <div>
            <CardContent className={props.classes.customDrawerContent}>
              <Typography component="h6" variant="h6">
                <div className={props.classes.user}>
                  <span style={{ fontWeight: 'bold', color: '#0075B3' }}>
                    Watson
                  </span>
                  <span>Senior Architect</span>
                </div>
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
      <List>
        <ListItem button component={NextLink} href="/home">
          <ListItemIcon
            className={router.pathname == '/home' ? classes.active : ''}
          >
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/home' ? classes.active : ''}
            primary="Home"
          />
        </ListItem>
        <ListItem button component={NextLink} href="/projects">
          <ListItemIcon
            className={router.pathname == '/projects' ? classes.active : ''}
          >
            <CreateNewFolderOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/projects' ? classes.active : ''}
            primary="Projects"
          />
        </ListItem>
        <ListItem button component={NextLink} href="/ides">
          <ListItemIcon
            className={router.pathname == '/ides' ? classes.active : ''}
          >
            <DesktopWindowsOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/ides' ? classes.active : ''}
            primary="IDE"
          />
        </ListItem>
        <ListItem button component={NextLink} href="/repositories">
          <ListItemIcon
            className={router.pathname == '/repositories' ? classes.active : ''}
          >
            <StorageOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/repositories' ? classes.active : ''}
            primary="Repositories"
          />
        </ListItem>
        <ListItem button component={NextLink} href="/about">
          <ListItemIcon
            className={router.pathname == '/about' ? classes.active : ''}
          >
            <BuildOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/about' ? classes.active : ''}
            primary="Installed tools"
          />
        </ListItem>
        <ListItem button component={NextLink} href="/wiki">
          <ListItemIcon
            className={router.pathname == '/wiki' ? classes.active : ''}
          >
            <DescriptionOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            className={router.pathname == '/wiki' ? classes.active : ''}
            primary="Wiki"
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Configurator" />
        </ListItem>
      </List>
      <div className={props.classes.upgrade}>
        <div>
          <div>
            <h4 className={props.classes.uppercase}>
              Latest version 3.0.1 <Info />
            </h4>
            <div>Get IDE fixes and more Features </div>
          </div>
          <div className={props.classes.updateAction}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={props.classes.button}
            >
              UPDATE NOW
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
