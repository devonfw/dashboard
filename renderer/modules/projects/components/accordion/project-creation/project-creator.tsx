import { useState, useEffect, useContext } from 'react';
import {
  messageSender,
  ProjectData,
} from '../../../../shared/services/renderer/messageSender.service';
import { StepperContext } from '../../../redux/stepperContext';
import { projectCreationProgress } from '../../../../../components/project-execution/projectExecution-ui/ExecutionContants';
import { CreateProjectActionData } from '../../../redux/actions/create-project-action';

interface ProjectCreatorProps {
  projectData: ProjectData;
}

export default function ProjectCreator(
  props: ProjectCreatorProps
): JSX.Element {
  const [hasError, setHasError] = useState<boolean>(false);
  const { state, dispatch } = useContext(StepperContext);

  useEffect(() => {
    const observable = messageSender.createProject(props.projectData);
    observable.subscribe(
      () => setHasError(false),
      () => setHasError(true),
      () => dispatch(new CreateProjectActionData(false, !hasError))
    );

    return () => {
      observable.unsubscribe();
    };
  }, []);

  return (
    <p>{projectCreationProgress(state.create.loading, state.create.success)}</p>
  );
}
