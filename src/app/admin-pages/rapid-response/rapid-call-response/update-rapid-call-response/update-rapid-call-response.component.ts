import {Component, Inject, OnInit} from '@angular/core';
import {CallReport, ReportGroup, RumorType} from '../../../call-report/call-reports.objects';
import {Region} from '../../../settings/regions/regions.objects';
import {Zone} from '../../../settings/zones/zones.objects';
import {CallReportsService} from '../../../services/call-reports.service';
import {RegionsService} from '../../../services/regions.service';
import {ZonesService} from '../../../services/zones.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Wereda} from '../../../settings/weredas/weredas.objects';
import {City} from '../../../settings/cities/cities.object';
import {SubCity} from '../../../settings/sub-cities/sub-cities.object';
import {Kebele} from '../../../settings/Settings.Objects';
import {WeredasService} from '../../../services/weredas.service';
import {CitiesService} from '../../../services/cities.service';
import {SubCitiesService} from '../../../services/sub-cities.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
    selector: 'app-update-rapid-call-response',
    templateUrl: './update-rapid-call-response.component.html',
    styleUrls: ['./update-rapid-call-response.component.scss']
})
export class UpdateRapidCallResponseComponent implements OnInit {
    public new_call_report = new CallReport();
    public regions: Region[] = [];
    public zones: Zone[] = [];
    public weredas: Wereda[] = [];
    public cities: City[] = [];
    public subCities: SubCity[] = [];
    public kebeles: Kebele[] = [];
    public genders = ['MALE', 'FEMALE'];
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment', 'Ethiopian'];
    public reportGroups: ReportGroup[] = [];
    public rummerTypes: RumorType[] = [];
    public loading = false;

    constructor(public dialogRef: MatDialogRef<UpdateRapidCallResponseComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport,
                private callReportsService: CallReportsService, private regionsService: RegionsService, private zonesService: ZonesService,
                private weredasService: WeredasService, private citiesService: CitiesService,
                private subCitiesService: SubCitiesService) {
        this.new_call_report = new_data;
    }

    ngOnInit() {
        this.regionsService.getRegionsList();
        this.regionsService.RegionsListEmitter.subscribe(
            data => {
                this.regions = data;
            }
        );
        this.zonesService.ZonesListEmitter.subscribe(
            data => {
                this.zones = data
            }
        );
        this.weredasService.WeredasListEmitter.subscribe(
            data => {
                this.weredas = data
                console.log('data', data);
            }
        );
        this.citiesService.CitiesListEmitter.subscribe(
            data => {
                this.cities = data
            }
        );
        this.subCitiesService.SubCitiesListEmitter.subscribe(
            data => {
                this.subCities = data
            }
        );
        if (this.new_call_report.region != null) {
            this.citiesService.getCitiesListByRegion(this.new_call_report.region);
        }

        const reportGroup0 = new ReportGroup();
        reportGroup0.id = 0;
        reportGroup0.name = 'Not Grouped';

        const reportGroup1 = new ReportGroup();
        reportGroup1.id = 1;
        reportGroup1.name = 'Rapid Response Team';

        const reportGroup2 = new ReportGroup();
        reportGroup2.id = 2;
        reportGroup2.name = 'Followup Team';

        const reportGroup3 = new ReportGroup();
        reportGroup3.id = 3;
        reportGroup3.name = 'Other Team';
        this.reportGroups.push(reportGroup0);
        this.reportGroups.push(reportGroup1);
        this.reportGroups.push(reportGroup2);
        this.reportGroups.push(reportGroup3);
    }

    public onRegionChanges(data: MatSelectChange) {
        const selectedRegion = new Region();
        selectedRegion.id = this.new_call_report.region_id;
        this.zonesService.getZonesList(selectedRegion);
        this.citiesService.getCitiesListByRegion(selectedRegion);
        this.new_call_report.zone_id = null;
        this.new_call_report.wereda_id = null;
        this.new_call_report.city_id = null;
        this.new_call_report.sub_city_id = null;
        this.new_call_report.kebele_id = null;
    }

    public onZoneChanges(data: MatSelectChange) {
        const selectedZone = new Zone();
        selectedZone.id = this.new_call_report.zone_id;
        this.weredasService.getWeredasList(selectedZone);
        this.new_call_report.wereda_id = null;
        this.new_call_report.city_id = null;
        this.new_call_report.sub_city_id = null;
        this.new_call_report.kebele_id = null;
    }

    public onWeredaChanges(data: MatSelectChange) {
        const selectedWereda = new Wereda();
        selectedWereda.id = this.new_call_report.wereda_id;
        this.citiesService.getCitiesList(selectedWereda);
        this.new_call_report.city_id = null;
        this.new_call_report.sub_city_id = null;
        this.new_call_report.kebele_id = null;
    }

    public onCityChanges(data: MatSelectChange) {
        const selectedCity = new City();
        selectedCity.id = this.new_call_report.city_id;
        this.subCitiesService.getSubCitiesList(selectedCity);
        this.new_call_report.sub_city_id = null;
        this.new_call_report.kebele_id = null;
    }

    public onSubCityChanges(data: MatSelectChange) {
        const selectedSubCity = new SubCity();
        selectedSubCity.id = this.new_call_report.sub_city_id;
        this.new_call_report.kebele_id = null;
    }

    public updateReport() {
        this.dialogRef.close(this.new_call_report);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
