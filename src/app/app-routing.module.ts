import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SettingsComponent } from './views/settings/settings.component';
import { RepositoryComponent } from './views/repository/repository.component';
import { NotificationsComponent } from './views/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: HomeComponent.route,
    component: HomeComponent,
  },
  {
    path: SettingsComponent.route,
    component: SettingsComponent
  },
  {
    path: `${RepositoryComponent.route}/:repo`,
    component: RepositoryComponent
  },
  {
    path: NotificationsComponent.route,
    component: NotificationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
