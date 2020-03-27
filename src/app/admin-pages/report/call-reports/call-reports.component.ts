import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CallReport, PaginatedCallReport} from '../../call-report/call-reports.objects';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {CallReportsService} from '../../services/call-reports.service';
import {NewReportComponent} from './new-report/new-report.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
    selector: 'app-call-reports',
    templateUrl: './call-reports.component.html',
    styleUrls: ['./call-reports.component.scss']
})
export class CallReportsComponent implements OnInit, OnChanges {
    @Input() allCallReports;
    public paginated_call_report = new PaginatedCallReport();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private dialog: MatDialog, private responseMessageService: SwalMessagesService,
                private callReportsService: CallReportsService) {
    }

    ngOnInit() {
        this.updateCallReportsComponent();
        this.callReportsService.PaginatedCallReportEmitter.subscribe(
            data => {
                this.paginated_call_report = data;
                this.loading = false;
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changes', changes);
        this.updateCallReportsComponent();
    }

    public updateCallReportsComponent() {
        this.loading = true;
        if (this.allCallReports) {
            this.callReportsService.getAllCallReports();
        } else {
            this.callReportsService.getNewCallReports();
        }
    }

    public updatePaginatedCallReportData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.callReportsService.getPaginatedRegionsData(this.paginated_call_report.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public updateCallReport(report: CallReport): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1200px';
        dialogConfig.data = report;
        const dialogRef = this.dialog.open(NewReportComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('NEW-Report', result);
                this.loading = true;
                this.callReportsService.updateCallReportGroup(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Report Updated Successfully');
                        this.updateCallReportsComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

}
