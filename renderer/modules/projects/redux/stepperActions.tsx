export type StepperActionType =
  | 'SET_ACTIVE'
  | 'NEXT_STEP'
  | 'PREVIOUS_STEP'
  | 'SET_STACK'
  | 'SET_STACK_CMD'
  | 'SET_STACK_CWD'
  | 'NOT_HANDLED'
  | 'RESET_STEP'
  | 'PROJECT_DETAILS'
  | 'SET_PROJECT_DATA';

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
    projectData?: {
      name: string;
      type: string;
      path: string;
      specificArgs?: {
        [key: string]: string | boolean | null | undefined;
      };
    };
  };
}
