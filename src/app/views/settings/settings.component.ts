import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import SettingsService from '../../shared/providers/settings.service';
import { MatSlideToggleChange } from '@angular/material';
import { ElectronService } from '../../shared/providers/electron.service';
import Docs from '../../../electron/providers/Docs';
import Devon from '../../../electron/providers/Devon';
import { NotificationsService } from '../../shared/providers/notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy{
  
  private callbackConsoleOutput: (event: any, data: any) => void;
  private callbackProcessFinished: (event: any, data: any) => void;
  public static route = 'settings';
  public darkTheme: boolean = false;
  public theme: string = 'Light';
  public running: boolean = false;

  public stdout: string[] = [];

  constructor(
    private settingsService: SettingsService,
    private electronService: ElectronService,
    private changeDetector: ChangeDetectorRef,
    private notificationsService: NotificationsService
  ) {  }

  ngOnInit(): void {
    this.changeDetector.reattach();
    this.checkTheme();
    this.callbackConsoleOutput = (event, data) => {
      console.log(event, data);
      this.stdout = [... this.stdout, data];
      this.running = true;
      this.changeDetector.detectChanges();
    };
    this.callbackProcessFinished = (event, data) => {
      console.log(event, data);
      this.stdout = [... this.stdout, 'Process finished!'];
      this.running = false;
      this.changeDetector.detectChanges();
    }
    this.electronService.ipcRenderer.on(Devon.events.CONSOLE_OUTPUT, this.callbackConsoleOutput);
    this.electronService.ipcRenderer.on(Devon.events.PROCESS_FINISHED, this.callbackProcessFinished);
  }

  private checkTheme(){
    this.darkTheme = this.settingsService.isDarkTheme();
    this.theme = this.darkTheme ? 'Dark' : 'Light';
  }

  public changeTheme(e: MatSlideToggleChange){
    this.settingsService.setDarkTheme(e.checked);
    this.checkTheme();
  }

  public addNotification(){
    this.notificationsService.addNotification(`Notification ${Math.round(Math.random() * 100)}`, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum');
  }

  ngOnDestroy(): void{
    this.electronService.ipcRenderer.removeListener(Devon.events.CONSOLE_OUTPUT, this.callbackConsoleOutput);
    this.electronService.ipcRenderer.removeListener(Devon.events.PROCESS_FINISHED, this.callbackProcessFinished);
    this.changeDetector.detach();
  }

}
