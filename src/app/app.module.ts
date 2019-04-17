import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './shared/providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { SidenavComponent } from './widgets/sidenav/sidenav.component';
import { ToolbarComponent } from './widgets/toolbar/toolbar.component';
import { SidenavService } from './sidenav.service';
import { WebframeComponent } from './components/webframe/webframe.component';
import { SafePipe } from './shared/pipes/SafePipe';
import { HomeComponent } from './views/home/home.component';
import { DevconService } from './shared/providers/devcon.service';
import { DatabaseService } from './shared/providers/database.service';
import { DocsService } from './shared/providers/docs.service';
import { SettingsComponent } from './views/settings/settings.component';
import SettingsService from './shared/providers/settings.service';
import GitHubService from './shared/providers/github.service';
import { ClipboardModule } from 'ngx-clipboard';
import { clipboard } from 'electron';
import { RepositoryComponent } from './views/repository/repository.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { NotificationsComponent } from './views/notifications/notifications.component';
import { ProjectComponent } from './views/project/project.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    SidenavComponent,
    ToolbarComponent,
    WebframeComponent,
    SafePipe,
    HomeComponent,
    SettingsComponent,
    RepositoryComponent,
    TerminalComponent,
    NotificationsPanelComponent,
    ProjectsComponent,
    NotificationsComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    ClipboardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    ElectronService, 
    SidenavService, 
    DatabaseService, 
    DevconService, 
    DocsService, 
    GitHubService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
