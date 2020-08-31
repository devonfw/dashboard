import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';

export default function HelpContent(): JSX.Element {
  const router = useRouter();

  const help = (route: string) => {
    switch (route) {
      case '/home':
        return <HomeHelp />;
      case '/projects':
        return <ProjectsHelp />;
      case '/repositories':
        return <RepositoriesHelp />;
      case '/settings/account':
        return <AccountHelp />;
      case '/settings/installed-versions':
        return <InstalledVersionHelp />;
      default:
        return 'No help available';
    }
  };

  return <>{help(router.route)}</>;
}

function HomeHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Welcome to devonfw dashboard
      </Typography>

      <Typography>To create projects you need a devonfw version.</Typography>
      <ul>
        <Typography component="li">
          Click on <strong>Download latest version</strong>
        </Typography>
      </ul>
    </>
  );
}

function ProjectsHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Projects
      </Typography>

      <Typography>Here are your devonfw projects. You can:</Typography>
      <ul>
        <Typography component="li">Open a project</Typography>
        <Typography component="li">Delete a project</Typography>
        <Typography component="li">or create a new one</Typography>
      </ul>
    </>
  );
}

function RepositoriesHelp(): JSX.Element {
  return (
    <Typography>
      Check the projects under devonfw organization.
      <ul>
        <Typography component="li">Open a project in your browser</Typography>
        <Typography component="li">
          Copy its link so you can clone it
        </Typography>
      </ul>
    </Typography>
  );
}

function InstalledVersionHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Installed versions
      </Typography>
      <Typography>Configure your installed devonfw-ide versions</Typography>
      <ul>
        <Typography component="li">
          Upgrade the software included in a specific version
        </Typography>
        <Typography component="li">Unistall a version</Typography>
      </ul>
    </>
  );
}

function AccountHelp(): JSX.Element {
  return (
    <>
      <Typography variant="h6" component="h2">
        Account
      </Typography>
      <Typography component="li">Update your profile</Typography>
    </>
  );
}
