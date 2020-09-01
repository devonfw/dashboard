import { useRouter } from 'next/router';
import HomeModule from '../../../../home/home.module';
import ProjectsModule from '../../../../projects/projects-dashboard/projects.module';
import ProjectCreationModule from '../../../../projects/project-creation.module';
import RepositoriesModule from '../../../../repositories/repositories.module';
import AccountModule from '../../../../settings/account/account.module';
import InstallationsModule from '../../../../settings/installations/installations.module';

export default function HelpContent(): JSX.Element {
  const router = useRouter();

  const help = (route: string) => {
    switch (route) {
      case HomeModule.route.path:
        return HomeModule.help();

      case ProjectsModule.route.path:
        return ProjectsModule.help();

      case ProjectCreationModule.route.path:
        return ProjectCreationModule.help();

      case RepositoriesModule.route.path:
        return RepositoriesModule.help();

      case AccountModule.route.path:
        return AccountModule.help();

      case InstallationsModule.route.path:
        return InstallationsModule.help();

      default:
        return 'No help available';
    }
  };

  return <>{help(router.route)}</>;
}
