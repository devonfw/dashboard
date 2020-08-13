import { ProjectDetails } from '../../models/project-details.model';

export interface SaveDetails {
  saveProjectDetails(data: ProjectDetails): void;
}
