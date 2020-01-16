import {
  Component,
  createRef,
  RefObject,
} from 'react';
import TerminalUIView from './TerminalUI.view';

export interface TerminalUIProps {
  previous: Array<{ cwd: string; cmd: string }>;
  cwd: string;
  children?: JSX.Element;
}

export interface TerminalUIState {}

export default class TerminalUI extends Component<TerminalUIProps, TerminalUIState> {
  scrollAnchor: RefObject<HTMLInputElement>;

  constructor(props: TerminalUIProps) {
    super(props);
    this.scrollAnchor = createRef();
  }

  componentDidUpdate(prevProps: TerminalUIProps, prevState: {}, snapshot: any) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    let current = this.scrollAnchor.current;
    if (current) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
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

