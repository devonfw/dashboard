import { makeStyles } from '@material-ui/core/styles';

export const useTerminalUIStyles = makeStyles({
  h1: {
    color: 'green',
    fontSize: '50px',
  },

  terminal: {
    padding: '16px',
    border: 'solid 2px gray',
    height: '300px',
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    overflowY: 'auto',
  },

  terminalCommand: {
    width: '100%',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },

  terminalPath: {
    width: '100%',
    overflowWrap: 'break-word',
    whiteSpace: 'pre-wrap',
  },

  terminalPathColor: {
    color: '#00ff66',
  },

  fontConsole: {
    fontFamily: 'monospace, monospace',
    fontSize: '0.8125rem',
  },

  colorGreen: {
    color: '#00ff66',
  },
});