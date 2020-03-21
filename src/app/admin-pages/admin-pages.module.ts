import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPagesRoutingModule } from './admin-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import {ComponentsModule} from "../components/components.module";
import {FormsModule} from "@angular/forms";
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatRippleModule,
  MatSelectModule, MatSortModule, MatStepperModule, MatTabsModule,
  MatTooltipModule
} from "@angular/material";
import {NgxLoadingModule} from "ngx-loading";
import { CallReportComponent } from './call-report/call-report.component';
import { ReportCategorizerComponent } from './report-categorizer/report-categorizer.component';
import { NewCallReportComponent } from './call-report/new-call-report/new-call-report.component';

@NgModule({
  declarations: [DashboardComponent, UserComponent, NewUserComponent, UpdateUserComponent, CallReportComponent, ReportCategorizerComponent, NewCallReportComponent],
  entryComponents: [NewUserComponent, UpdateUserComponent, NewCallReportComponent],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    ComponentsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatTabsModule,
    MatRadioModule,
    MatStepperModule,
    MatSortModule,
    NgxLoadingModule.forRoot({}),
  ]
})
export class AdminPagesModule { }
