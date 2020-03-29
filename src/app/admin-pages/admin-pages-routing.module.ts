import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {CallReportComponent} from './call-report/call-report.component';
import {ReportCategorizerComponent} from './report-categorizer/report-categorizer.component';
import {SettingsComponent} from './settings/settings.component';
import {ReportComponent} from './report/report.component';
import {RapidResponseComponent} from './rapid-response/rapid-response.component';
import {FollowUpComponent} from './follow-up/follow-up.component';
import {OthersTeamComponent} from './others-team/others-team.component';
import {TeamContactsComponent} from './team-contacts/team-contacts.component';

const routes: Routes = [
  { path: 'dashboards',      component: DashboardComponent },
  { path: 'call_reports',      component: CallReportComponent },
  { path: 'report_category',      component: ReportCategorizerComponent },
  { path: 'reports',      component: ReportComponent },
  { path: 'team_contacts',      component: TeamContactsComponent },
  { path: 'rapid_response',      component: RapidResponseComponent },
  { path: 'followups',      component: FollowUpComponent },
  { path: 'others',      component: OthersTeamComponent },
  { path: 'settings',      component: SettingsComponent },
  { path: 'users',      component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
