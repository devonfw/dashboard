import { useState, useEffect, RefObject, createRef, useContext } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  processCommand: () => void;
  resetState: () => void;
}

export default function ProjectExecutionUIView(
  props: ProjectExecutionUIViewProps
): JSX.Element {
  const renderer = new Renderer();
  const classes = useProjectExecutionUIStyles({});
  const [expanded, setExpanded] = useState<string | boolean>('panel2');
  const [installationUpdate, setInstallationUpdate] = useState<string>('');
  const [installationTrack, setInstallationTrack] = useState<string>('');
  const [installationRequired, setInstallationRequired] = useState<boolean>(
    true
  );
  const scrollAnchor: RefObject<HTMLDivElement> = createRef();
  const { dispatch } = useContext(StepperContext);
  const INSTALLATION_MESSAGES = {
    setUp: 'Setup Installation',
    success: 'Installation Completed',
    error: 'Something went wrong. Sorry for inconvenience',
  };

  const PROJECT_CREATION_INFO = {
    projectCreation: 'Project Creation',
    inprogress: 'In Progress',
    success: 'Successfully Created',
    error:
      'Error Occurred while creating a project. Sorry for the inconvenience.',
  };

  useEffect(() => {
    renderer.on('powershell/installation/packages', handler);
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

  const handleChange = (panel: string) => (
    event: React.ChangeEvent<any>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const projectCreationUpdate = <TrackMessage message={props.message} />;

  const installUpdate = installationTrack ? (
    <TrackMessage message={installationTrack} />
  ) : null;

  const handler = (_: never, message: string): void => {
    if (message === 'success' || message === 'error') {
      setInstallationTrack(message);
    }

    if (message === 'success') {
      message = INSTALLATION_MESSAGES.success;
    }

    if (message === 'error') {
      message = INSTALLATION_MESSAGES.error;
    }

    setInstallationUpdate((prevState: string) => {
      return `${prevState}\n${message.trim()}`;
    });
  };

  const installEventHandler = () => {
    setInstallationTrack('start');
    renderer.sendMultiple(
      'powershell/installation/packages',
      null,
      props.installationPath
    );
  };

  const cancelInstallation = () => {
    setInstallationRequired(false);
  };

  const setActiveState = () => {
    dispatch({
      type: 'RESET_STEP',
    });
  };

  const retry = () => {
    props.resetState();
    props.processCommand();
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="execution">
            <div>{PROJECT_CREATION_INFO.projectCreation}</div>
            {projectCreationUpdate}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="project-process-info">
            {!props.message ? (
              PROJECT_CREATION_INFO.inprogress
            ) : props.message === 'success' ? (
              <div className="success">{PROJECT_CREATION_INFO.success}</div>
            ) : (
              <div className="error">
                {PROJECT_CREATION_INFO.error}
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={retry}
                >
                  Retry
                </Button>
              </div>
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {props.type !== 'java' &&
      props.message === 'success' &&
      installationRequired ? (
        <ExpansionPanel
          square
          expanded={expanded === 'panel2'}
          className="process"
          onChange={handleChange('panel2')}
        >
          <ExpansionPanelSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="execution">
              <div>{INSTALLATION_MESSAGES.setUp}</div>
              {installUpdate}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={installationUpdate == '' ? '' : 'process-details'}
          >
            {installationUpdate == '' ? (
              <InstallationGuide
                installEventHandler={installEventHandler}
                cancelInstallation={cancelInstallation}
              />
            ) : (
              <InstallationTerminal
                installationUpdate={installationUpdate}
                scrollAnchor={scrollAnchor}
              />
            )}
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
            disabled={installationRequired && installationTrack !== 'success'}
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
