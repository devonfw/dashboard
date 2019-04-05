import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ElectronService } from './electron.service';
import { Observable, of } from 'rxjs';
import { Item } from '../../../assets/model/item.schema';
import Database from '../../../electron/providers/Database';
import { Workspace } from '../../../assets/model/workspace.schema';

@Injectable()
export class DatabaseService {
    constructor(private _electronService: ElectronService) { }

    getItems(): Observable<Item[]> {
        return of(this._electronService.ipcRenderer.sendSync(Database.actions.GET_ITEMS)).pipe(
            catchError((error: any) => Observable.throw(error.json))
        );
    }

    addItem(item: Item): Observable<Item[]> {
        return of(
            this._electronService.ipcRenderer.sendSync(Database.actions.ADD_ITEM, item)
        ).pipe(catchError((error: any) => Observable.throw(error.json)));
    }

    deleteItem(item: Item): Observable<Item[]> {
        return of(
            this._electronService.ipcRenderer.sendSync(Database.actions.DELETE_ITEM, item)
        ).pipe(catchError((error: any) => Observable.throw(error.json)));
    }

    getWorkspaces(): Observable<Workspace[]> {
        return of(
            this._electronService.ipcRenderer.sendSync(Database.actions.GET_WORKSPACES)
        ).pipe(catchError((error: any) => Observable.throw(error.json)));
    }

    addWorkspace(workspace: Workspace): Observable<Workspace[]> {
        return of(
            this._electronService.ipcRenderer.sendSync(Database.actions.ADD_WORKSPACE, workspace)
        ).pipe(catchError((error: any) => Observable.throw(error.json)));
    }
}