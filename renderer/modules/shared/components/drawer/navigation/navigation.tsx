import CustomDrawer from './custom-drawer/custom-drawer';
import Drawer from '@material-ui/core/Drawer';
import useDawerStyles from '../drawer.style';
import useNavigationStyles from './navigation.styles';

interface NavigationProps {
  classes: ReturnType<typeof useDawerStyles>;
}

const Navigation = (props: NavigationProps): JSX.Element => {
  const classes = useNavigationStyles();

  return (
    <nav
      className={props.classes.drawer}
      aria-label="devonfw dashboard sections"
    >
      <Drawer
        classes={{
          paper: props.classes.drawerPaper,
        }}
        className={classes.drawer}
        variant="permanent"
        open
      >
        <CustomDrawer classes={props.classes}></CustomDrawer>
      </Drawer>
    </nav>
  );
};
export default Navigation;
