export type StepActionType =
  | 'NEXT_STEP'
  | 'PREVIOUS_STEP'
  | 'RESET_STEP'
  | 'SET_ACTIVE';

export interface StepAction {
  type: StepActionType;
  payload?: {
    activeStep?: number;
  };
}
