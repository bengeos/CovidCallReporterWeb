import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Zone} from '../zones/zones.objects';
import {PaginatedWeredas, Wereda} from './weredas.objects';
import swal from 'sweetalert2';
import {WeredasService} from '../../services/weredas.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {NewWeredaComponent} from './new-wereda/new-wereda.component';
import {UpdateWeredaComponent} from './update-wereda/update-wereda.component';

@Component({
    selector: 'app-weredas',
    templateUrl: './weredas.component.html',
    styleUrls: ['./weredas.component.scss']
})
export class WeredasComponent implements OnInit, OnChanges {
    @Input() selectedZone: Zone = new Zone();
    @Output() selectWereda = new EventEmitter<any>();
    public paginatedWereda = new PaginatedWeredas();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500];
    public loading = false;

    constructor(private zoneServices: WeredasService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateWeredasComponent();
        this.zoneServices.PaginatedWeredasEmitter.subscribe(
            data => {
                this.paginatedWereda = data
            }
        );
    }

    ngOnChanges(changedData) {
        console.log('DATA: ', changedData);
        if (changedData.selectedZone.currentValue) {
            this.zoneServices.getPaginatedWeredas(this.selectedZone);
        }
    }

    public onSelectWereda(wereda) {
        this.selectWereda.emit(wereda);
    }

    public updateWeredasComponent() {
        this.zoneServices.getPaginatedWeredas(this.selectedZone);
    }

    public updatePaginatedWeredaData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.zoneServices.getPaginatedWeredasData(this.paginatedWereda.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewWereda(): void {
        const newWereda = new Wereda();
        if (this.selectedZone) {
            newWereda.selected_region = this.selectedZone.region;
            newWereda.selected_region_id = this.selectedZone.region.id;
            newWereda.zone_id = this.selectedZone.id;
            newWereda.zone = this.selectedZone;
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = newWereda;
        const dialogRef = this.dialog.open(NewWeredaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.zoneServices.addNewWereda(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Wereda Added Successfully');
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

    public updateWereda(data: Wereda): void {
        data.selected_region = this.selectedZone.region;
        data.selected_region_id = this.selectedZone.region.id;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(UpdateWeredaComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.zoneServices.updateWereda(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Wereda Updated Successfully');
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

    public deleteWereda(data: Wereda) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Wereda',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.zoneServices.deleteWereda(data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'Wereda Deleted Successfully');
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
