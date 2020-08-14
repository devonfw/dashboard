import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { IdeInstallations } from '../../landing-page/landing-page';
import useIdeListStyles from './ide-list.style';

export default function IdeList(props: {
  data: IdeInstallations[];
}): JSX.Element {
  const classes = useIdeListStyles();

  return (
    <List>
      {props.data.map((ide, index) => {
        return (
          <ListItem key={index} className={classes.listItem}>
            <p>Path: {ide.id}</p>
            <p>Version: {ide.ideConfig.version}</p>
          </ListItem>
        );
      })}
    </List>
  );
}
