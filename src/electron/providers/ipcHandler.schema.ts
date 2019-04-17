import { BrowserWindow } from 'electron';

export default abstract class ipcHandler {
    abstract async init(win: BrowserWindow): Promise<void>;
}
