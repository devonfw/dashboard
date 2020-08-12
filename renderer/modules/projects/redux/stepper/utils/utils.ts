import { ProjectDataPayload } from '../actions/project-data-action';
import { StepperState } from '../stepperContext';

export function updateProjectDataState(
  state: StepperState,
  projectData: ProjectDataPayload | undefined
): StepperState {
  return {
    ...state,
    projectData: {
      ...state.projectData,
      ...(projectData ? projectData : {}),
      specificArgs: {
        ...state.projectData?.specificArgs,
        ...(projectData?.specificArgs ? projectData?.specificArgs : {}),
      },
    },
  };
}
