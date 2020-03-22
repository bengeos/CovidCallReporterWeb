import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PaginatedRegions, Region} from "./regions.objects";
import {RegionsService} from "../../services/regions.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {SwalMessagesService} from "../../services/swal-messages.service";
import {NewRegionComponent} from "./new-region/new-region.component";
import {UpdateRegionComponent} from "./update-region/update-region.component";
import swal from "sweetalert2";

@Component({
    selector: 'app-regions',
    templateUrl: './regions.component.html',
    styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {
    @Output() selectRegion = new EventEmitter<any>();
    public paginated_regions = new PaginatedRegions();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private regionsService: RegionsService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateRegionsComponent();
        this.regionsService.PaginatedRegionsEmitter.subscribe(
            data => {
                this.paginated_regions = data
            }
        );
    }

    public onSelectRegion(region: Region) {
        this.selectRegion.emit(region);
    }

    public updateRegionsComponent() {
        this.regionsService.getPaginatedRegions();
    }

    public updatePaginatedRegionData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.regionsService.getPaginatedRegionsData(this.paginated_regions.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewRegion(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new Region();
        const dialogRef = this.dialog.open(NewRegionComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.regionsService.addNewRegion(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Region Added Successfully');
                        this.updateRegionsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateRegion(data: Region): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = data;
        const dialogRef = this.dialog.open(UpdateRegionComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.regionsService.updateRegion(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Region Updated Successfully');
                        this.updateRegionsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public deleteRegion(data: Region) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Region',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.regionsService.deleteRegion(data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'Region Deleted Successfully');
                        this.updateRegionsComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateRegionsComponent();
                    }
                );
            }
        });
    }

}
