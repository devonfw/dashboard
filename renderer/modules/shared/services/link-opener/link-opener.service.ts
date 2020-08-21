export default class LinkOpenerService {
  openLink(url: string): void {
    global.ipcRenderer.send('repositories', url);
  }
}
