import * as React from 'react';
import { messageSender } from '../../../shared/services/renderer/messageSender.service';
import { CreateProjectActionData } from '../stepper/actions/create-project-action';
import { StepperContext } from '../stepper/stepperContext';
import { ProjectData } from '../stepper/project-data.model';

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
  const { dispatch } = React.useContext(StepperContext);

  const triggerCreation = (projectData: ProjectData) => {
    const observable = messageSender.createProject(projectData);
    observable.subscribe(
      () => null,
      () => null,
      (finishedWithError) => {
        observable.unsubscribe();
        dispatch(new CreateProjectActionData(false, !finishedWithError));
      }
    );
  };
  const value = { triggerCreation };
  return (
    <CreatorContext.Provider value={value}>
      {props.children}
    </CreatorContext.Provider>
  );
}
