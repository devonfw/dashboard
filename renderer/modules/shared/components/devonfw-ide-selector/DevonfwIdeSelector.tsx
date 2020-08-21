import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { IpcRendererEvent } from 'electron';
import { StepperContext } from '../../../projects/redux/stepper/stepperContext';
import { ProjectDataActionData } from '../../../projects/redux/stepper/actions/project-data-action';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import WhiteTextField from '../white-text-field/white-text-field';

interface InstancePath {
  ideConfig: {
    workspaces: string;
  };
}

export default function DevonfwIdeSelector(
  props: React.HTMLAttributes<HTMLDivElement>
): JSX.Element {
  const [devonIdeInstances, setDevonIdeInstances] = useState<string[]>([]);
  const { state, dispatch } = useContext(StepperContext);

  const selectInstance = (instance: string) => {
    dispatch(new ProjectDataActionData({ path: instance }));
  };

  useEffect(() => {
    global.ipcRenderer.send('find:devonfwInstances');
    global.ipcRenderer.on(
      'get:devoninstances',
      (_: IpcRendererEvent, instancesPath: InstancePath[]) => {
        const instances = instancesPath.map((p) => p.ideConfig.workspaces);
        setDevonIdeInstances(instances);
        selectInstance(instances[0]);
      }
    );

    return () => {
      global.ipcRenderer.removeAllListeners('get:devoninstances');
    };
  }, []);

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const devonInstancesOpt = event.target.value;
    selectInstance(devonInstancesOpt);
  };

  return (
    <FormControl className={props.className}>
      <WhiteTextField
        id="select-instance-label"
        select
        label="CHOOSE YOUR DEVONFW INSTANCE"
        value={state.projectData.path}
        onChange={handleChange}
        variant="outlined"
      >
        {devonIdeInstances.map((path) => (
          <MenuItem key={path} value={path}>
            {path}
          </MenuItem>
        ))}
      </WhiteTextField>
    </FormControl>
  );
}
