import {Component, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CallReport, RumorType} from '../call-reports.objects';
import {RegionsService} from '../../services/regions.service';
import {Region} from '../../settings/regions/regions.objects';
import {ZonesService} from '../../services/zones.service';
import {Zone} from '../../settings/zones/zones.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CallReportsService} from '../../services/call-reports.service';
import {MatSelectChange} from '@angular/material/select';
import {WeredasService} from '../../services/weredas.service';
import {Wereda} from '../../settings/weredas/weredas.objects';
import {City} from '../../settings/cities/cities.object';
import {SubCity} from '../../settings/sub-cities/sub-cities.object';
import {CitiesService} from '../../services/cities.service';
import {SubCitiesService} from '../../services/sub-cities.service';
import {Kebele} from '../../settings/Settings.Objects';

@Component({
    selector: 'app-new-call-report',
    templateUrl: './new-call-report.component.html',
    styleUrls: ['./new-call-report.component.scss']
})
export class NewCallReportComponent implements OnInit, OnChanges {
    public new_call_report = new CallReport();
    public regions: Region[] = [];
    public zones: Zone[] = [];
    public weredas: Wereda[] = [];
    public cities: City[] = [];
    public subCities: SubCity[] = [];
    public kebeles: Kebele[] = [];
    public genders = ['MALE', 'FEMALE'];
    public favoriteSeason = '';
    public providedInfromation: string[] = ['Sign-Symptom', 'Transmission Mode', 'Prevention', 'Treatment'];
    public toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
    public rummerTypes: RumorType[] = [];
    public loading = false;

    constructor(private regionsService: RegionsService, private zonesService: ZonesService,
                private weredasService: WeredasService, private citiesService: CitiesService,
                private subCitiesService: SubCitiesService, private callReportService: CallReportsService,
                public dialogRef: MatDialogRef<NewCallReportComponent>, @Inject(MAT_DIALOG_DATA) new_data: CallReport) {
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
        this.callReportService.getRumorTypes();
        this.callReportService.CallRumorTypesListEmitter.subscribe(
            data => {
                this.rummerTypes = data;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('CHANGES', changes);
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
    public addNewCallReport() {
        this.dialogRef.close(this.new_call_report);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
