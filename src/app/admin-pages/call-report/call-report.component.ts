import {Component, OnInit} from '@angular/core';
import {CallReport, PaginatedCallReport} from './call-reports.objects';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewCallReportComponent} from './new-call-report/new-call-report.component';
import {SwalMessagesService} from '../services/swal-messages.service';
import {RegionsService} from '../services/regions.service';
import {Region} from '../settings/regions/regions.objects';
import {CallReportsService} from '../services/call-reports.service';
import {UpdateCallReportComponent} from './update-call-report/update-call-report.component';
import {User} from '../user/user.objects';
import swal from 'sweetalert2';

@Component({
    selector: 'app-call-report',
    templateUrl: './call-report.component.html',
    styleUrls: ['./call-report.component.scss']
})
export class CallReportComponent implements OnInit {
    public paginated_call_report = new PaginatedCallReport();
    public regions: Region[] = [];
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private dialog: MatDialog, private responseMessageService: SwalMessagesService,
                private regionsService: RegionsService, private callReportsService: CallReportsService) {
    }

    ngOnInit() {
        this.updateCallReportComponent();
        this.regionsService.RegionsListEmitter.subscribe(
            data => {
                this.regions = data;
            }
        );
        this.callReportsService.PaginatedCallReportEmitter.subscribe(
            data => {
                this.paginated_call_report = data;
                this.loading = false;
            }
        );
    }

    public updateCallReportComponent() {
        this.callReportsService.getCallReportsOfUser();
        this.regionsService.getRegionsList();
    }

    public updatePaginatedCallReportData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.callReportsService.getPaginatedRegionsData(this.paginated_call_report.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewCallReport(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1200px';
        dialogConfig.data = new CallReport();
        const dialogRef = this.dialog.open(NewCallReportComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('NEW-Report', result);
                this.loading = true;
                this.callReportsService.addNewCallReport(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Call Report Added Successfully');
                        this.updateCallReportComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateCallReport(report: CallReport): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1200px';
        dialogConfig.data = report;
        const dialogRef = this.dialog.open(UpdateCallReportComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.callReportsService.updateCallReport(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Call Report Updated Successfully');
                        this.updateCallReportComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }
    public deleteCallReport(report_data: CallReport) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Report',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.callReportsService.deleteCallReport(report_data).subscribe(
                    succes => {
                        this.responseMessageService.showNotification(4, 'top', 'right', 'Report Deleted Successfully');
                        this.updateCallReportComponent();
                    },
                    failed => {
                        this.responseMessageService.displayErrorResponseMessage(failed);
                        this.updateCallReportComponent();
                    }
                );
            }
        });
    }

}
