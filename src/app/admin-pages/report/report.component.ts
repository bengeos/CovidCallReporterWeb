import {Component, OnInit} from '@angular/core';
import {PaginatedCallReport} from '../call-report/call-reports.objects';
import {MatDialog} from '@angular/material';
import {SwalMessagesService} from '../services/swal-messages.service';
import {CallReportsService} from '../services/call-reports.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    public paginated_call_report = new PaginatedCallReport();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private dialog: MatDialog, private responseMessageService: SwalMessagesService,
                private callReportsService: CallReportsService) {
    }

    ngOnInit() {
        this.loading = true;
        this.callReportsService.getPaginatedCallReports();
        this.callReportsService.PaginatedCallReportEmitter.subscribe(
            data => {
                this.paginated_call_report = data;
                this.loading = false;
            }
        );
    }

    public updatePaginatedCallReportData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.callReportsService.getPaginatedRegionsData(this.paginated_call_report.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

}
