import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {CallReportComponent} from "./call-report/call-report.component";
import {ReportCategorizerComponent} from "./report-categorizer/report-categorizer.component";
import {SettingsComponent} from "./settings/settings.component";
import {ReportComponent} from "./report/report.component";

const routes: Routes = [
  { path: 'dashboards',      component: DashboardComponent },
  { path: 'call_reports',      component: CallReportComponent },
  { path: 'report_category',      component: ReportCategorizerComponent },
  { path: 'reports',      component: ReportComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'users',      component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
