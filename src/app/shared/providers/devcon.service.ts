import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Devon from '../../../electron/providers/Devon';

@Injectable()
export class DevconService {
    constructor(private _electronService: ElectronService) { }

    checkVersion(): Observable<any> {
        return of(this._electronService.ipcRenderer.sendSync(Devon.actions.CHECK_VERSION)).pipe(
            catchError((error: any) => Observable.throw(error))
        );
    }

    createWorkspace(name: string) {
        this._electronService.ipcRenderer.send(Devon.actions.CREATE_WORKSPACE, name);
    }

    openWorkspace(workspace: string) {
        this._electronService.ipcRenderer.send(Devon.actions.OPEN_WORKSPACE, workspace);
    }
}