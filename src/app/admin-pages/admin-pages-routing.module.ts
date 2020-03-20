import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  { path: 'dashboards',      component: DashboardComponent },
  { path: 'users',      component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
