export type StepActionType =
  | 'NEXT_STEP'
  | 'PREVIOUS_STEP'
  | 'RESET_STEP'
  | 'SET_CREATING_PROJECT'
  | 'RESET_STEPPER'
  | 'ACCESSIBILITY'
  | 'RESET_ACCESSIBILITY';

export interface StepAction {
  type: StepActionType;
}

export class NextStepAction {
  type: StepActionType = 'NEXT_STEP';
}
