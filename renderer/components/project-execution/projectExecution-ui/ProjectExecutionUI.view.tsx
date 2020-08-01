import { useState, useEffect, RefObject, createRef, useContext } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { StepperContext } from '../../Stepper/redux/stepperContext';
import { useProjectExecutionUIStyles } from './ProjectExecutionUI.styles';
import Renderer from '../../../services/renderer/renderer.service';
import InstallationGuide from './InstallationGuide';
import InstallationTerminal from './InstallationTerminal';
import TrackMessage from './TrackMessage';

export interface ProjectExecutionUIViewProps {
  message: string;
  installationPath: string;
  type: string;
}

export default function ProjectExecutionUIView(
  props: ProjectExecutionUIViewProps
): JSX.Element {
  const renderer = new Renderer();
  const classes = useProjectExecutionUIStyles({});
  const [expanded, setExpanded] = useState<string | boolean>('panel2');
  const [installationUpdate, setInstallationUpdate] = useState<string>('');
  const [installationTrack, setInstallationTrack] = useState<string>('');
  const [installationRequired, setInstallationRequired] = useState<boolean>(true);
  const scrollAnchor: RefObject<HTMLDivElement> = createRef();
  const { dispatch } = useContext(StepperContext);
  
  useEffect(() => {
    // renderer.on('powershell/installation/packages', handler);
    return () => {
      global.ipcRenderer.removeAllListeners('powershell/installation/packages');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = (): void => {
    if (scrollAnchor.current) {
      scrollAnchor.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const projectCreationUpdate = <TrackMessage message={props.message}/>;

  const installUpdate = installationTrack ? <TrackMessage message={installationTrack}/> : null;

  const handler = (_: never, message: string): void => {
    if (message === 'success' || message === 'error') {
      setInstallationTrack(message);
    }

    if (message === 'success') {
      message = 'Installation Completed'
    }

    setInstallationUpdate((prevState: string) => {
      return `${prevState}\n${message.trim()}`
    })
  };
  
  const installEventHandler = () => {
    setInstallationTrack('success');
    // renderer.sendMultiple(
    //   'powershell/installation/packages',
    //   null,
    //   props.installationPath
    // );
  }

  const cancelInstallation = () => {
    setInstallationRequired(false);
  }

  const setActiveState = () => {
    dispatch({
      type: 'RESET_STEP',
    });
  };

  return (
    <div className={classes.root}>
        <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
            <div className='execution'>
              <div>
                Folder Creation
              </div>
              {projectCreationUpdate}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="project-process-info">
              {!props.message ? 'In Progress..' : props.message === 'success' ? 
                <div className="success">Successfully Created</div> : 
                <div className="error">Error Occurred while creating a project. Sorry for the inconvenience. Please try it again</div>
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {props.type !== 'java' && props.message === 'success' && installationRequired ? (
          <ExpansionPanel square expanded={expanded === 'panel2'} className='process' onChange={handleChange('panel2')}>
            <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
              <div className='execution'>
                <div>
                  Setup Installation
                </div>
                {installUpdate}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={installationUpdate == '' ? '' : 'process-details' }>
              {installationUpdate == '' ? (
                <InstallationGuide installEventHandler={installEventHandler} cancelInstallation={cancelInstallation}/> ) : 
                <InstallationTerminal installationUpdate={installationUpdate} scrollAnchor={scrollAnchor} /> 
              }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ) : null}
        <div className="action">
            <div>
              <Button variant="outlined" onClick={setActiveState}>
                Back
              </Button>
            </div>
          <Link href="/projects">
            <Button
              disabled={installationRequired === true && installationTrack !== 'success'}
              size="small"
              variant="contained"
              color="primary"
            >
              Finish
            </Button>
          </Link>
      </div>
    </div>
  );
}