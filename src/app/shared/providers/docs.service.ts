import { Injectable } from "@angular/core";
import { ElectronService } from "./electron.service";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import Docs from "../../../electron/providers/Docs";

@Injectable()
export class DocsService {
    constructor(private _electronService: ElectronService) { }

    getRemoteContent(url: string): Observable<string> {
        return of(this._electronService.ipcRenderer.sendSync(Docs.actions.GET_DOCS, url)).pipe(
            catchError((error: any) => Observable.throw(error.json))
        );
    }

    openWeb(url: string){
        this._electronService.ipcRenderer.send(Docs.actions.OPEN_BROWSER, url);
    }
    
}