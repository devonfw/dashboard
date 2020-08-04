import { Component, RefObject } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface InstallationProps {
  installationUpdate: string;
  scrollAnchor: RefObject<HTMLDivElement>;
}

export default class InstallationTerminal extends Component<InstallationProps> {
  constructor(props: InstallationProps) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <div>
        {this.props.installationUpdate}
        <div ref={this.props.scrollAnchor}></div>
        {!this.props.installationUpdate.trim().includes('Completed') &&
        !this.props.installationUpdate.includes('Something went wrong') ? (
          <div className="progress">
            <CircularProgress />
          </div>
        ) : null}
      </div>
    );
  }
}
