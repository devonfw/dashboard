import { ProjectDetails } from '../../modules/projects/redux/stepper/data.model';

export interface ProjectFilter {
  filter(compareTo: string): ProjectDetails[];
}
