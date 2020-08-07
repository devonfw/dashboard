import { useState, useEffect, RefObject, createRef, useContext } from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StepperContext } from '../../../modules/projects/components/Stepper/redux/stepperContext';
import { useProjectExecutionUIStyles } from './ProjectExecutionUI.styles';
import Renderer from '../../../services/renderer/renderer.service';
import InstallationGuide from './InstallationGuide';
import InstallationTerminal from './InstallationTerminal';
import TrackMessage from './TrackMessage';
import EXECUTION_CONTANTS from './ExecutionContants';

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
  const [expanded, setExpanded] = useState<string | boolean>(
    EXECUTION_CONTANTS.installation
  );
  const [installationUpdate, setInstallationUpdate] = useState<string>('');
  const [installationTrack, setInstallationTrack] = useState<string>('');
  const [installationRequired, setInstallationRequired] = useState<boolean>(
    true
  );
  const scrollAnchor: RefObject<HTMLDivElement> = createRef();
  const { dispatch } = useContext(StepperContext);

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
    event: React.ChangeEvent<HTMLElement>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const projectCreationUpdate = <TrackMessage message={props.message} />;

  const installUpdate = installationTrack ? (
    <TrackMessage message={installationTrack} />
  ) : null;

  const handler = (_: never, message: string): void => {
    if (
      message === EXECUTION_CONTANTS.success ||
      message === EXECUTION_CONTANTS.error
    ) {
      setInstallationTrack(message);
    }

    if (message === EXECUTION_CONTANTS.success) {
      message = EXECUTION_CONTANTS.INSTALLATION_MESSAGES.success;
    }

    if (message === EXECUTION_CONTANTS.error) {
      message = EXECUTION_CONTANTS.INSTALLATION_MESSAGES.error;
    }

    setInstallationUpdate((prevState: string) => {
      return `${prevState}\n${message.trim()}`;
    });
  };

  const installEventHandler = (): void => {
    setInstallationTrack(EXECUTION_CONTANTS.start);
    renderer.sendMultiple(
      'powershell/installation/packages',
      null,
      props.installationPath
    );
  };

  const cancelInstallation = (): void => {
    setInstallationRequired(false);
  };

  const setActiveState = (): void => {
    dispatch({
      type: 'RESET_STEP',
    });
  };

  const retry = (): void => {
    props.resetState();
    props.processCommand();
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        square
        expanded={expanded === EXECUTION_CONTANTS.projectCreation}
        onChange={handleChange(EXECUTION_CONTANTS.projectCreation)}
      >
        <ExpansionPanelSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <div className="execution">
            <div>
              {EXECUTION_CONTANTS.PROJECT_CREATION_INFO.projectCreation}
            </div>
            {projectCreationUpdate}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="project-process-info">
            {!props.message ? (
              EXECUTION_CONTANTS.PROJECT_CREATION_INFO.inprogress
            ) : props.message === EXECUTION_CONTANTS.success ? (
              <div className="success">
                {EXECUTION_CONTANTS.PROJECT_CREATION_INFO.success}
              </div>
            ) : (
              <div className="error">
                {EXECUTION_CONTANTS.PROJECT_CREATION_INFO.error}
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={retry}
                >
                  {EXECUTION_CONTANTS.retry}
                </Button>
              </div>
            )}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {props.type !== EXECUTION_CONTANTS.java &&
      props.message === EXECUTION_CONTANTS.success &&
      installationRequired ? (
        <ExpansionPanel
          defaultExpanded={true}
          square
          className="process"
          onChange={handleChange(EXECUTION_CONTANTS.installation)}
        >
          <ExpansionPanelSummary
            aria-controls="panel2d-content"
            id="panel2d-header"
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="execution">
              <div>{EXECUTION_CONTANTS.INSTALLATION_MESSAGES.setUp}</div>
              {installUpdate}
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            className={
              installationUpdate == '' ? '' : EXECUTION_CONTANTS.process_details
            }
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
            {EXECUTION_CONTANTS.back}
          </Button>
        </div>
        <Link href="/projects">
          <Button
            disabled={
              installationRequired &&
              (props.type !== EXECUTION_CONTANTS.java
                ? installationTrack !== EXECUTION_CONTANTS.success
                : props.message !== EXECUTION_CONTANTS.success)
            }
            size="small"
            variant="contained"
            color="primary"
          >
            {EXECUTION_CONTANTS.finish}
          </Button>
        </Link>
      </div>
    </div>
  );
}
