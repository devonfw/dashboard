import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SidenavService } from '../../sidenav.service';
import { SettingsComponent } from '../../views/settings/settings.component';
import { HomeComponent } from '../../views/home/home.component';
import { RepositoryComponent } from '../../views/repository/repository.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('snav') public sidenav: MatSidenav;

  public homePage = HomeComponent.route;
  public settingsPage = SettingsComponent.route;
  public devonJavaPage = HomeComponent.route;
  public devonJavaScriptPage = HomeComponent.route;
  public devonNetPage = HomeComponent.route;
  public repositoryPage = RepositoryComponent.route;
  
  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
