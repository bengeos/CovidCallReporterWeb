import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {City} from '../cities/cities.object';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {UpdateCityComponent} from '../cities/update-city/update-city.component';
import swal from 'sweetalert2';
import {PaginatedSubCities, SubCity} from './sub-cities.object';
import {SubCitiesService} from '../../services/sub-cities.service';
import {NewSubCityComponent} from './new-sub-city/new-sub-city.component';

@Component({
    selector: 'app-sub-cities',
    templateUrl: './sub-cities.component.html',
    styleUrls: ['./sub-cities.component.scss']
})
export class SubCitiesComponent implements OnInit, OnChanges {
    @Input() selectedCity: City = new City();
    @Output() selectSubCity = new EventEmitter<any>();
    public paginatedSubCities = new PaginatedSubCities();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500];
    public loading = false;

    constructor(private subCitiesServices: SubCitiesService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateSubCitiesComponent();
        this.subCitiesServices.PaginatedSubCitiesEmitter.subscribe(
            data => {
                this.paginatedSubCities = data
            }
        );
    }

    ngOnChanges(changedData) {
        console.log('DATA: ', changedData);
        if (changedData.selectedWereda.currentValue) {
            this.subCitiesServices.getPaginatedSubCities(this.selectedCity);
        }
    }

    public onSelectSubCity(subCity) {
        this.selectSubCity.emit(subCity);
    }

    public updateSubCitiesComponent() {
        this.subCitiesServices.getPaginatedSubCities(this.selectedCity);
    }

    public updatePaginatedSubCitiesData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.subCitiesServices.getPaginatedSubCitiesData(this.paginatedSubCities.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewSubCity(): void {
        const newSubCity = new SubCity();
        if (this.selectedCity) {
            newSubCity.selected_wereda_id = this.selectedCity.wereda_id;
            newSubCity.selected_wereda = this.selectedCity.wereda;
            newSubCity.city_id = this.selectedCity.id;
            newSubCity.city = this.selectedCity;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = newSubCity;
        const dialogRef = this.dialog.open(NewSubCityComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.subCitiesServices.addNewSubCity(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'SubCity Added Successfully');
                        this.updateSubCitiesComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateSubCity(data: SubCity): void {
        data.selected_wereda_id = this.selectedCity.wereda_id;
        data.selected_wereda = this.selectedCity.wereda;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(UpdateCityComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.subCitiesServices.updateSubCity(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'SubCity Updated Successfully');
                        this.updateSubCitiesComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public deleteSubCity(data: SubCity) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this subCity',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.subCitiesServices.deleteSubCity(data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'subCity Deleted Successfully');
                        this.updateSubCitiesComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateSubCitiesComponent();
                    }
                );
            }
        });
    }
}
