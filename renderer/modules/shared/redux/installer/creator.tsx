import * as React from 'react';
import {
  ProjectData,
  messageSender,
} from '../../services/renderer/messageSender.service';
import { CreateProjectActionData } from '../../../projects/redux/actions/create-project-action';
import { StepperContext } from '../../../projects/redux/stepperContext';

export interface ICreatorContext {
  triggerCreation: (data: ProjectData) => void;
}

export const CreatorContext = React.createContext<ICreatorContext>({
  triggerCreation: () => null,
});
export const CreatorConsumer = CreatorContext.Consumer;

interface CreatorProviderProps {
  children: JSX.Element;
}

export function CreatorProvider(props: CreatorProviderProps): JSX.Element {
  const [hasError, setHasError] = React.useState<boolean>(false);
  const { dispatch } = React.useContext(StepperContext);

  const triggerCreation = (projectData: ProjectData) => {
    const observable = messageSender.createProject(projectData);
    observable.subscribe(
      () => setHasError(false),
      () => setHasError(true),
      () => dispatch(new CreateProjectActionData(false, !hasError))
    );
  };
  const value = { triggerCreation };
  return (
    <CreatorContext.Provider value={value}>
      {props.children}
    </CreatorContext.Provider>
  );
}
