import { Component, OnInit } from '@angular/core';
import {PaginatedCallReport} from "./call-reports.objects";

@Component({
  selector: 'app-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.scss']
})
export class CallReportComponent implements OnInit {
  public paginated_call_report = new PaginatedCallReport();
  public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
  public loading = false;
  constructor() { }

  ngOnInit() {
  }

}
