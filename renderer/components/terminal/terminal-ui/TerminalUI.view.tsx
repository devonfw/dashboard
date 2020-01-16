import React, {RefObject} from 'react';
import Records from './records';
import { useTerminalUIStyles } from './TerminalUI.styles';

export interface TerminalUIViewProps {
  previous: Array<{ cwd: string; cmd: string }>;
  cwd: string;
  scrollAnchor: RefObject<HTMLInputElement>;
  children?: JSX.Element;
}

export default function TerminalUIView(props: TerminalUIViewProps) {
  const classes = useTerminalUIStyles();

  return (
    <div className={ classes.terminal }>
      <Records previous={ props.previous } />
      <span className={`${ classes.fontConsole } ${ classes.colorGreen }`}>
        { props.cwd }
      </span>
      <br />${' '}
      { props.children }
      <div ref={ props.scrollAnchor }></div>
    </div>
  )
}