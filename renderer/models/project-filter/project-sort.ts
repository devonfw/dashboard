import { ProjectDetails } from '../../modules/projects/redux/stepper/data.model';

export interface ProjectSort {
  sort(): ProjectDetails[];
}
