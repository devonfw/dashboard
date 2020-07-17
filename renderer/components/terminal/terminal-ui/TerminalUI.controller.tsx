import { Component, createRef, RefObject } from 'react';
import TerminalUIView from './TerminalUI.view';

export interface TerminalUIProps {
  previous: Array<{ cwd: string; cmd: string }>;
  cwd: string;
  children?: JSX.Element;
}

export default class TerminalUI extends Component<TerminalUIProps> {
  scrollAnchor: RefObject<HTMLInputElement>;

  constructor(props: TerminalUIProps) {
    super(props);
    this.scrollAnchor = createRef();
  }

  componentDidUpdate(): void {
    this.scrollToBottom();
  }

  scrollToBottom = (): void => {
    const current = this.scrollAnchor.current;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render(): JSX.Element {
    return (
      <TerminalUIView
        scrollAnchor={this.scrollAnchor}
        cwd={this.props.cwd}
        previous={this.props.previous}
      >
        {this.props.children}
      </TerminalUIView>
    );
  }
}
