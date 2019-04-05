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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ElectronService, SidenavService, DatabaseService, DevconService],
  bootstrap: [AppComponent],
})
export class AppModule {}
