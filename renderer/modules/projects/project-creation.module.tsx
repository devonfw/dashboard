import ProjectCreationHelp from './components/project-creation-help/project-creation-help';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Module from '../shared/models/module.model';

const route = {
  id: 'Project Creation',
  section: 'Project Creation',
  path: '/projects/creation',
  icon: <CreateNewFolderOutlinedIcon />,
};

const help = (): JSX.Element => <ProjectCreationHelp />;

const ProjectCreationModule: Module = { route, help };

export default ProjectCreationModule;
