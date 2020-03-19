import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [DashboardComponent, UserComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule
  ]
})
export class AdminPagesModule { }
