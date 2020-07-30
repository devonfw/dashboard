export default function WelcomeSnippet(): JSX.Element {
  return (
    <>
      <h1>Welcome to devonfw-ide!</h1>
      <p>
        The devonfw-ide is a fantastic tool to automatically download, install,
        setup and update the IDE (integrated development environment) of your
        software development projects.
      </p>
      <p>For further details visit the following links:</p>
      <ul style={{ fontWeight: 'bold' }}>
        <li>
          <a>features &amp; motivation</a>
        </li>
        <li>
          <a>download &amp; setup</a>
        </li>
        <li>
          <a>usage</a>
        </li>
      </ul>
    </>
  );
}
