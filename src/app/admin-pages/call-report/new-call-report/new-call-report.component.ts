import { Component, OnInit } from '@angular/core';
import {CallReport} from "../call-reports.objects";

@Component({
  selector: 'app-new-call-report',
  templateUrl: './new-call-report.component.html',
  styleUrls: ['./new-call-report.component.scss']
})
export class NewCallReportComponent implements OnInit {
  public new_call_report = new CallReport();
  constructor() { }

  ngOnInit() {
  }

}
