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
import { RapidResponseComponent } from './rapid-response/rapid-response.component';
import { FollowUpComponent } from './follow-up/follow-up.component';

@NgModule({
    declarations: [DashboardComponent, UserComponent, NewUserComponent, UpdateUserComponent, CallReportComponent,
        ReportCategorizerComponent, NewCallReportComponent, SettingsComponent, RegionsComponent, ZonesComponent,
        WeredasComponent, NewRegionComponent, UpdateRegionComponent, NewZoneComponent, UpdateZoneComponent,
        NewWeredaComponent, UpdateWeredaComponent, ReportComponent, UpdateCallReportComponent, RapidResponseComponent, FollowUpComponent],
    entryComponents: [NewUserComponent, UpdateUserComponent, NewCallReportComponent, NewRegionComponent,
        UpdateRegionComponent, NewZoneComponent, UpdateZoneComponent, NewWeredaComponent, UpdateWeredaComponent,
        UpdateCallReportComponent],
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
