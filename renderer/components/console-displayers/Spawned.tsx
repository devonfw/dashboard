import { Component, MouseEvent, Fragment } from 'react';

interface CustomProps {
  handleInfo: (event: MouseEvent) => void;
  message: string;
  command: string;
}

class Spawned extends Component<CustomProps> {
  constructor(props: CustomProps) {
    super(props);
  }

  directoryInfo(): JSX.Element | null {
    if (this.props.message) {
      return (
        <Fragment>
          <h3>Directory info:</h3>
          <pre>{this.props.message}</pre>
        </Fragment>
      );
    }

    return null;
  }

  render(): JSX.Element {
    return (
      <Fragment>
        <div className="directory-info">
          <button onClick={this.props.handleInfo}>
            Execute <strong>{this.props.command}</strong>
          </button>
          {this.directoryInfo()}
        </div>

        <style jsx>
          {`
            h1 {
              color: green;
              font-size: 50px;
            }

            .directory-info {
              padding: 16px;
              border: solid 2px gray;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default Spawned;
