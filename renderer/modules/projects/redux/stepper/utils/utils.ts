import { ProjectDataPayload } from '../actions/project-data-action';
import { StepperState } from '../stepperContext';

export function updateProjectDataState(
  state: StepperState,
  projectData: ProjectDataPayload
): StepperState {
  return {
    ...state,
    projectData: {
      ...state.projectData,
      ...projectData,
      specificArgs: {
        ...(projectData.specificArgs ? projectData.specificArgs : {}),
      },
    },
  };
}
