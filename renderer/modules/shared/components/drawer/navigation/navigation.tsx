import CustomDrawer from './custom-drawer/custom-drawer';
import Drawer from '@material-ui/core/Drawer';
import responsiveDrawerStyle from '../drawer.style';

interface NavigationProps {
  classes: ReturnType<typeof responsiveDrawerStyle>;
}

const Navigation = (props: NavigationProps): JSX.Element => {
  return (
    <nav
      className={props.classes.drawer}
      aria-label="devonfw dashboard sections"
    >
      <Drawer
        classes={{
          paper: props.classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        <CustomDrawer classes={props.classes}></CustomDrawer>
      </Drawer>
    </nav>
  );
};
export default Navigation;
