import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Wereda} from '../weredas/weredas.objects';
import {SwalMessagesService} from '../../services/swal-messages.service';
import swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {City, PaginatedCities} from './cities.object';
import {CitiesService} from '../../services/cities.service';
import {NewCityComponent} from './new-city/new-city.component';
import {UpdateCityComponent} from './update-city/update-city.component';

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnChanges {
    @Input() selectedWereda: Wereda = new Wereda();
    @Output() selectCity = new EventEmitter<any>();
    public paginatedCities = new PaginatedCities();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500];
    public loading = false;

    constructor(private citiesServices: CitiesService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateWeredasComponent();
        this.citiesServices.PaginatedCitiesEmitter.subscribe(
            data => {
                this.paginatedCities = data
            }
        );
    }

    ngOnChanges(changedData) {
        console.log('DATA: ', changedData);
        if (changedData.selectedWereda.currentValue) {
            this.citiesServices.getPaginatedCities(this.selectedWereda);
        }
    }

    public onSelectCity(city) {
        this.selectCity.emit(city);
    }

    public updateWeredasComponent() {
        this.citiesServices.getPaginatedCities(this.selectedWereda);
    }

    public updatePaginatedCitiesData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.citiesServices.getPaginatedCitiesData(this.paginatedCities.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewCity(): void {
        const newCity = new City();
        if (this.selectedWereda) {
            newCity.selected_zone_id = this.selectedWereda.zone.id;
            newCity.selected_zone = this.selectedWereda.zone;
            newCity.wereda_id = this.selectedWereda.id;
            newCity.wereda = this.selectedWereda;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = newCity;
        const dialogRef = this.dialog.open(NewCityComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.citiesServices.addNewCity(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'City Added Successfully');
                        this.updateWeredasComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateCity(data: City): void {
        data.selected_zone_id = this.selectedWereda.zone_id;
        data.selected_zone = this.selectedWereda.zone;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(UpdateCityComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.citiesServices.updateCity(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'City Updated Successfully');
                        this.updateWeredasComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public deleteCity(data: City) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this city',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.citiesServices.deleteCity(data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'city Deleted Successfully');
                        this.updateWeredasComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateWeredasComponent();
                    }
                );
            }
        });
    }

}
