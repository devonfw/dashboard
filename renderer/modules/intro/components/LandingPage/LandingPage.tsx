import { useEffect, useState } from 'react';
import { IpcRendererEvent } from 'electron';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IdeDialog from './IdeDialog';

const useStyles = makeStyles({
  root: {
    padding: '6rem 0 2rem 1rem',
    color: '#FFFFFF',
    marginLeft: '100px',
    width: '500px',
  },
  welcomeImage: {
    width: '400px',
  },
  welcomeText: {
    width: '400px',
  },
  button: {
    backgroundColor: '#0075B3',
    color: '#FFFFFF',
  },
});

interface LandingPageProps {
  navigateHandler: () => void;
}

export interface IdeInstallations {
  id: string;
  ideConfig: {
    basepath: string;
    workspaces: string;
    commands: string;
    version: string;
  };
}

export default function LandingPage(props: LandingPageProps): JSX.Element {
  const classes = useStyles();

  const [IDEs, setIDEs] = useState<IdeInstallations[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    global.ipcRenderer.send('find:devonfwInstances');

    global.ipcRenderer.on(
      'get:devoninstances',
      (_: IpcRendererEvent, data: IdeInstallations[]) => {
        if (data.length) {
          setIDEs(data);
          setOpenDialog(true);
        }
      }
    );
  }, []);

  const closeDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <img className={classes.welcomeImage} src="/assets/welcome.svg" />
      <h1>Welcome to devonfw-dashboard!</h1>
      <p className={classes.welcomeText}>
        Let&apos;s get your profile setup and desribe your dev environment as
        code and get a fully prebuilt, reday-to-code development environment.
      </p>
      <Button
        onClick={props.navigateHandler}
        className={classes.button}
        variant="contained"
        color="primary"
      >
        Get Started Now
      </Button>
      <IdeDialog
        data={IDEs}
        open={openDialog}
        onClose={closeDialog}
      ></IdeDialog>
    </div>
  );
}
