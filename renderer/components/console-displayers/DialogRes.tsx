import { Component, MouseEvent, Fragment } from 'react';

interface CustomProps {
  handleInfo: (event: MouseEvent) => void;
  message: string[];
  command: string;
}

class DialogRes extends Component<CustomProps> {
  constructor(props: CustomProps) {
    super(props);
  }

  directoryInfo(): JSX.Element | null {
    if (this.props.message.length > 0) {
      return (
        <Fragment>
          <h3>Selected files:</h3>
          {this.props.message.map((item: string, index: number) => (
            <p key={index}>{item}</p>
          ))}
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

export default DialogRes;
