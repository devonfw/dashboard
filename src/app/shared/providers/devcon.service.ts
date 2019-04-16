import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Devon from '../../../electron/providers/Devon';

@Injectable()
export class DevconService {
    constructor(private _electronService: ElectronService) { }

    installIDE(){
        console.log("Installing ide");
        this._electronService.ipcRenderer.send(Devon.actions.INSTALL_IDE);
    }


}