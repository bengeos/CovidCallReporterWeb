import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CallReport, PaginatedCallReport} from '../../call-report/call-reports.objects';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {CallReportsService} from '../../services/call-reports.service';
import {UpdateRapidCallResponseComponent} from '../../rapid-response/rapid-call-response/update-rapid-call-response/update-rapid-call-response.component';
import {AssignFollowupReportComponent} from "./assign-followup-report/assign-followup-report.component";
import {UpdateAssignedFollowupReportComponent} from "./update-assigned-followup-report/update-assigned-followup-report.component";

@Component({
    selector: 'app-followup-call-reports',
    templateUrl: './followup-call-reports.component.html',
    styleUrls: ['./followup-call-reports.component.scss']
})
export class FollowupCallReportsComponent implements OnInit, OnChanges {
    @Input() allCallReports;
    public paginated_call_report = new PaginatedCallReport();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private dialog: MatDialog, private responseMessageService: SwalMessagesService,
                private callReportsService: CallReportsService) {
    }

    ngOnInit() {
        this.updateCallReportsComponent();
        this.callReportsService.PaginatedFollowupCallReportEmitter.subscribe(
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
            this.callReportsService.getAssignedFollowupCallReports();
        } else {
            this.callReportsService.getPaginatedNewFollowupCallReports();
        }
    }

    public updatePaginatedCallReportData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.callReportsService.getPaginatedRegionsData(this.paginated_call_report.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public updateFollowupCallReport(report: CallReport): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1200px';
        dialogConfig.data = report;
        const dialogRef = this.dialog.open(UpdateRapidCallResponseComponent, dialogConfig);
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

    public assignFollowupReport(report: CallReport) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = report;
        if (this.allCallReports) {
            const dialogRef = this.dialog.open(UpdateAssignedFollowupReportComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    console.log('Update Assigned-Report', result);
                }
            });
        } else {
            const dialogRef = this.dialog.open(AssignFollowupReportComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    console.log('Assign-Report', result);
                    this.loading = true;
                    this.callReportsService.assignCallReportForFollowupTeam(result).subscribe(
                        succes => {
                            this.loading = false;
                            this.responseMessageService.showNotification(2, 'top', 'right', 'Call-Report Assigned Successfully');
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

}
