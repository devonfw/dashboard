import { useContext } from 'react';
import ProjectExecution from '../../../../../components/project-execution/ProjectExecution';
import { StepperContext } from '../../../redux/stepperContext';

export default function ExecutionStep(): JSX.Element {
  const { state } = useContext(StepperContext);

  let stackCmd = state.stackCmd;
  stackCmd = stackCmd ? stackCmd : '';

  let stackCwd = state.stackCwd;
  stackCwd = stackCwd ? stackCwd : '';

  let projectDetails = state.projectDetails;
  projectDetails = projectDetails ? projectDetails : '';

  const initialCommand = `${stackCmd}`;
  const initialCwd = `${stackCwd}`;

  return (
    <ProjectExecution
      initialCommand={initialCommand}
      initialCwd={initialCwd}
      projectDetails={projectDetails}
    ></ProjectExecution>
  );
}
