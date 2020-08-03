export type StepperActionType =
  | 'SET_ACTIVE'
  | 'NEXT_STEP'
  | 'PREVIOUS_STEP'
  | 'SET_STACK'
  | 'SET_STACK_CMD'
  | 'SET_STACK_CWD'
  | 'NOT_HANDLED'
  | 'RESET_STEP'
  | 'PROJECT_DETAILS';

export interface StepperAction {
  type: StepperActionType;
  payload?: {
    stack?: string;
    stackCmd?: string;
    stackCwd?: string;
    activeStep?: number;
    projectDetails?: {
      name: string;
      domain: string;
    };
  };
}
