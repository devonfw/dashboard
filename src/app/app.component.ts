import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ElectronService } from './shared/providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { SidenavService } from './sidenav.service';
import { MatSidenav } from '@angular/material';
import { remote } from 'electron';
import { Subject, Subscription } from 'rxjs';
import SettingsService from './shared/providers/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  public isThemeDark: boolean = false;
  
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private sidenavService: SidenavService,
    private settingsService: SettingsService
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    this.sidenavService.setSidenav(this.sidenav);
    this.isThemeDark = this.settingsService.isDarkTheme();
    this.settingsService.darkThemeSubject.subscribe(isDark => this.isThemeDark = isDark);
  }

}
