import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DocsService } from '../../shared/providers/docs.service';
import { DevconService } from '../../shared/providers/devcon.service';
import { ElectronService } from '../../shared/providers/electron.service';
import Devon from '../../../electron/providers/Devon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  public static route = 'home';

  constructor(private docsService: DocsService, private devonService: DevconService, private _electronService: ElectronService) { }

  ngAfterViewInit(): void {
    //this.docsService.getRemoteContent('https://github.com/devonfw/devon/wiki/getting-started-what-is-devonfw').subscribe(response => console.log(response));
    // this._electronService.ipcRenderer.on(Devon.events.CONSOLE_OUTPUT, (event, data) => {
    //   console.log(event, data);
    // });    
    // this.devonService.installIDE();
  } 

}
