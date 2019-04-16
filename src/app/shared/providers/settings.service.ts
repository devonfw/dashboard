import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export default class SettingsService {
    public darkThemeSubject = new BehaviorSubject<boolean>(false);

    public setDarkTheme(type: boolean): void{
        this.darkThemeSubject.next(type);
    }

    public isDarkTheme(): boolean{
        return this.darkThemeSubject.value;
    }
}