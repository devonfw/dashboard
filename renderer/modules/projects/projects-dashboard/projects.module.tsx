import ProjectsHelp from './components/projects-help/projects-help';
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import Module from '../../shared/models/module.model';

const route = {
  id: 'Projects',
  section: 'Projects',
  path: '/projects',
  icon: <CreateNewFolderOutlinedIcon />,
};

const help = (): JSX.Element => <ProjectsHelp />;

const ProjectsModule: Module = { route, help };

export default ProjectsModule;
