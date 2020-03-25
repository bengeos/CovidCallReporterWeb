import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {PaginatedZones, Zone} from './zones.objects';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {ZonesService} from '../../services/zones.service';
import {NewZoneComponent} from './new-zone/new-zone.component';
import {UpdateZoneComponent} from './update-zone/update-zone.component';
import swal from 'sweetalert2';
import {Region} from '../regions/regions.objects';

@Component({
    selector: 'app-zones',
    templateUrl: './zones.component.html',
    styleUrls: ['./zones.component.scss']
})
export class ZonesComponent implements OnInit, OnChanges {
    @Input() selectedRegion: Region = new Region();
    @Output() selectZone = new EventEmitter<any>();
    public paginatedZone = new PaginatedZones();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500];
    public loading = false;

    constructor(private zoneServices: ZonesService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateZonesComponent();
        this.zoneServices.PaginatedZonesEmitter.subscribe(
            data => {
                this.paginatedZone = data
            }
        );
    }

    ngOnChanges(changedData) {
        if (changedData.selectedRegion.currentValue) {
            this.zoneServices.getPaginatedZones(this.selectedRegion);
        }
    }

    public onSelectZone(zone) {
        this.selectZone.emit(zone);
    }

    public updateZonesComponent() {
        this.zoneServices.getPaginatedZones(this.selectedRegion);
    }

    public updatePaginatedZoneData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.zoneServices.getPaginatedZonesData(this.paginatedZone.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewZone(): void {
        const newZone = new Zone();
        newZone.region_id = this.selectedRegion.id;
        newZone.region = this.selectedRegion;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = newZone;
        const dialogRef = this.dialog.open(NewZoneComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.zoneServices.addNewZone(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Zone Added Successfully');
                        this.updateZonesComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateZone(data: Zone): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = data;
        console.log('UPDATE-ZOE', data);
        const dialogRef = this.dialog.open(UpdateZoneComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.zoneServices.updateZone(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Zone Updated Successfully');
                        this.updateZonesComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public deleteZone(data: Zone) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Zone',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.zoneServices.deleteZone(data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'Zone Deleted Successfully');
                        this.updateZonesComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateZonesComponent();
                    }
                );
            }
        });
    }

}
