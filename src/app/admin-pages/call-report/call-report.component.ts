import { Component, OnInit } from '@angular/core';
import {CallReport, PaginatedCallReport} from "./call-reports.objects";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {NewCallReportComponent} from "./new-call-report/new-call-report.component";
import {SwalMessagesService} from "../services/swal-messages.service";

@Component({
  selector: 'app-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.scss']
})
export class CallReportComponent implements OnInit {
  public paginated_call_report = new PaginatedCallReport();
  public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
  public loading = false;
  constructor(private dialog: MatDialog, private responseMessageService: SwalMessagesService) { }

  ngOnInit() {
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
        // this.loading = true;
        // this.usersService.addNewUser(result).subscribe(
        //     succes => {
        //       this.loading = false;
        //       this.responseMessageService.showNotification(2, 'top', 'right', 'User Added Successfully');
        //       this.updateUsersComponent();
        //     },
        //     failed => {
        //       this.loading = false;
        //       this.responseMessageService.displayErrorResponseMessage(failed);
        //     }
        // );
      }
    });
  }

}
