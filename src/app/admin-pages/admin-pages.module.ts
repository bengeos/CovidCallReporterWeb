import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './user/user.component';
import {NewUserComponent} from './user/new-user/new-user.component';
import {UpdateUserComponent} from './user/update-user/update-user.component';
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
import {CallReportComponent} from './call-report/call-report.component';
import {ReportCategorizerComponent} from './report-categorizer/report-categorizer.component';
import {NewCallReportComponent} from './call-report/new-call-report/new-call-report.component';
import {SettingsComponent} from './settings/settings.component';
import {RegionsComponent} from './settings/regions/regions.component';
import {ZonesComponent} from './settings/zones/zones.component';
import {WeredasComponent} from './settings/weredas/weredas.component';
import {NewRegionComponent} from './settings/regions/new-region/new-region.component';
import {UpdateRegionComponent} from './settings/regions/update-region/update-region.component';
import {NewZoneComponent} from './settings/zones/new-zone/new-zone.component';
import {UpdateZoneComponent} from './settings/zones/update-zone/update-zone.component';
import {NewWeredaComponent} from './settings/weredas/new-wereda/new-wereda.component';
import {UpdateWeredaComponent} from './settings/weredas/update-wereda/update-wereda.component';
import {ReportComponent} from './report/report.component';
import {UpdateCallReportComponent} from './call-report/update-call-report/update-call-report.component';
import {RapidResponseComponent} from './rapid-response/rapid-response.component';
import {FollowUpComponent} from './follow-up/follow-up.component';
import {NewReportComponent} from './report/call-reports/new-report/new-report.component';
import {CallReportsComponent} from './report/call-reports/call-reports.component';
import {CommunityReportsComponent} from './report/community-reports/community-reports.component';
import {TravelerReportsComponent} from './report/traveler-reports/traveler-reports.component';
import {OthersTeamComponent} from './others-team/others-team.component';
import {RapidCallResponseComponent} from './rapid-response/rapid-call-response/rapid-call-response.component';
import {UpdateRapidCallResponseComponent} from './rapid-response/rapid-call-response/update-rapid-call-response/update-rapid-call-response.component';
import {FollowupCallReportsComponent} from './follow-up/followup-call-reports/followup-call-reports.component';
import {CitiesComponent} from './settings/cities/cities.component';
import {NewCityComponent} from './settings/cities/new-city/new-city.component';
import {UpdateCityComponent} from './settings/cities/update-city/update-city.component';
import {SubCitiesComponent} from './settings/sub-cities/sub-cities.component';
import {NewSubCityComponent} from './settings/sub-cities/new-sub-city/new-sub-city.component';
import {UpdateSubCityComponent} from './settings/sub-cities/update-sub-city/update-sub-city.component';

@NgModule({
    declarations: [DashboardComponent, UserComponent, NewUserComponent, UpdateUserComponent, CallReportComponent,
        ReportCategorizerComponent, NewCallReportComponent, SettingsComponent, RegionsComponent, ZonesComponent,
        WeredasComponent, NewRegionComponent, UpdateRegionComponent, NewZoneComponent, UpdateZoneComponent,
        NewWeredaComponent, UpdateWeredaComponent, ReportComponent, UpdateCallReportComponent, RapidResponseComponent,
        FollowUpComponent, NewReportComponent, CallReportsComponent, CommunityReportsComponent, TravelerReportsComponent,
        OthersTeamComponent, RapidCallResponseComponent, UpdateRapidCallResponseComponent, FollowupCallReportsComponent,
        CitiesComponent, NewCityComponent, UpdateCityComponent, SubCitiesComponent, NewSubCityComponent, UpdateSubCityComponent],
    entryComponents: [NewUserComponent, UpdateUserComponent, NewCallReportComponent, NewRegionComponent,
        UpdateRegionComponent, NewZoneComponent, UpdateZoneComponent, NewWeredaComponent, UpdateWeredaComponent,
        UpdateCallReportComponent, NewReportComponent, UpdateRapidCallResponseComponent, NewCityComponent,
        UpdateCityComponent, NewSubCityComponent, UpdateSubCityComponent],
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
export class AdminPagesModule {
}
