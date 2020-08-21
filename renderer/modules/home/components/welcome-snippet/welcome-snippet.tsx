import Link from '@material-ui/core/Link';
import welcomeLinks from './welcome-links';
import Typography from '@material-ui/core/Typography';
import useWelcomeSnippetStyles from './welcome-snippet.styles';
import LinkOpenerService from '../../../shared/services/link-opener/link-opener.service';

export default function WelcomeSnippet(): JSX.Element {
  const classes = useWelcomeSnippetStyles();
  const linkOpener = new LinkOpenerService();

  const openLink = (url: string) => {
    return () => linkOpener.openLink(url);
  };

  return (
    <>
      <Typography variant="h4" component="h1" className={classes.title}>
        Welcome to devonfw dashboard!
      </Typography>
      <Typography variant="h6" component="p" className={classes.description}>
        devonfw dashboard uses devonfw-ide, a fantastic tool to automatically
        download, install, setup and update the IDE (integrated development
        environment) of your software development projects.
      </Typography>
      <Typography variant="h6" component="p" className={classes.description}>
        For further details visit the following links:
      </Typography>
      <ul className={classes.links}>
        {welcomeLinks.map((link) => (
          <li key={link.text + link.url}>
            <Link
              variant="h6"
              component="a"
              color="inherit"
              className={classes.link}
              onClick={openLink(link.url)}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
