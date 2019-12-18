import { INgData } from "./data.model";

export type StepperActionType =
  | 'SET_ACTIVE'
  | 'NEXT_STEP'
  | 'PREVIOUS_STEP'
  | 'SET_STACK'
  | 'SET_STACK_DATA'
  | 'NOT_HANDLED';

export interface StepperAction {
  type: StepperActionType;
  payload?: {
    stack?: string;
    stackData?: INgData
    activeStep?: number;
  };
}
