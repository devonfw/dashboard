import { Component } from 'react';
import { IpcRendererEvent } from 'electron';
import router from 'next/router';
import ToolbarContainer from '../modules/intro/components/ToolbarContainer/ToolbarContainer';

export default class Intro extends Component {
  componentDidMount(): void {
    this.checkProfileExists();
  }

  componentWillUnmount(): void {
    global.ipcRenderer.removeAllListeners('get:profileStatus');
  }

  checkProfileExists = (): void => {
    global.ipcRenderer.send('find:profileStatus');
    global.ipcRenderer.on(
      'get:profileStatus',
      (event: IpcRendererEvent, exists: boolean) => {
        if (exists) {
          router.push('/home');
        }
      }
    );
  };

  render(): JSX.Element {
    return <ToolbarContainer></ToolbarContainer>;
  }
}
