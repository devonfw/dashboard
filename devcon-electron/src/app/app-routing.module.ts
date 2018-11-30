import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/project/create/create.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { InfoComponent } from './components/dist/info/info.component';

const routes: Routes = [
  {
    path: 'devon4jcreate',
    component: CreateComponent,
  },
  {
    path: 'workspace',
    component: WorkspaceComponent,
  },
  {
    path: 'distinfo',
    component: InfoComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
