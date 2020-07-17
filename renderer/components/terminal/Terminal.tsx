import { Component, KeyboardEvent, ChangeEvent } from 'react';
import Renderer from '../../services/renderer/renderer.service';
import TerminalUI from './terminal-ui/TerminalUI.controller';

export interface TerminalState {
  previous: Array<{ cwd: string; cmd: string }>;
  input: string;
  cwd: string;
}

export interface TerminalProps {
  initialCommand?: string;
  initialCwd?: string;
}

export default class Terminal extends Component<TerminalProps, TerminalState> {
  state = {
    previous: [],
    input: '',
    cwd: '',
  };

  renderer: Renderer;

  constructor(props: TerminalProps) {
    super(props);
    this.renderer = new Renderer();
  }

  componentDidMount(): void {
    this.renderer.send('terminal/all-commands', 'cd').then((cwd) => {
      this.setState({ cwd });
    });
  }

  /**
   * Sends a command to the node process. If it is a "cd" command
   * the new current working directory is saved
   *
   * @memberof Terminal
   */
  handleSendCommand = async (e: KeyboardEvent): Promise<void> => {
    if (e.key === 'Enter') {
      const inputClean = this.state.input.trim();
      const cwdClean = this.state.cwd.trim();
      let cwd = cwdClean;
      let message: string;

      try {
        message = await this.renderer.send(
          'terminal/all-commands',
          inputClean,
          cwdClean
        );

        if (inputClean.startsWith('cd ')) {
          const resp = await this.renderer.send(
            'terminal/all-commands',
            `${inputClean} && cd`,
            cwd
          );
          cwd = resp.toString().trim();
        }
      } catch (error) {
        message = error;
      } finally {
        this.setState((prevState: Readonly<TerminalState>) => {
          const executedInCwd = `${prevState.cwd}`;
          const executedCmd = `\$ ${prevState.input}\n${message}`;
          const previousCmd = { cwd: executedInCwd, cmd: executedCmd };
          const previous = [...prevState.previous, previousCmd];
          return { previous, input: '', cwd };
        });
      }
    }
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ input: event.target.value });
  };

  render(): JSX.Element {
    return (
      <>
        <TerminalUI previous={this.state.previous} cwd={this.state.cwd}>
          <input
            value={this.state.input}
            className="terminal__input font--console"
            placeholder="write your command"
            onChange={this.handleChange}
            onKeyDown={this.handleSendCommand}
          />
        </TerminalUI>
        <style jsx>
          {`
            .terminal__input {
              background-color: inherit;
              border: none;
              caret-color: white;
              color: inherit;
              width: calc(100% - 1rem);
            }

            .terminal__input:focus {
              outline-width: 0;
            }

            .font--console {
              font-family: monospace, monospace;
              font-size: 0.8125rem;
            }
          `}
        </style>
      </>
    );
  }
}
