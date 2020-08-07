import ProjectCreation from './project-creation/project-creation';
import ModulesInstallation from './modules-installation/modules-installation';

export default function ProjectAccordion(): JSX.Element {
  return (
    <>
      <ProjectCreation></ProjectCreation>
      <ModulesInstallation></ModulesInstallation>
    </>
  );
}
