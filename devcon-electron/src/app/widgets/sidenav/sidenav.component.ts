import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('snav') public sidenav: MatSidenav;
  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
