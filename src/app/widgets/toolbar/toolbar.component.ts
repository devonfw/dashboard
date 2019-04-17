import { Component, OnInit } from '@angular/core';
import { SidenavService } from '../../sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private sidenav: SidenavService) {}
  toggleActive = false;

  ngOnInit() {}

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
