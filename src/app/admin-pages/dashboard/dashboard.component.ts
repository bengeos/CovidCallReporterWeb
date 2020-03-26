import { Component, OnInit } from '@angular/core';
import {DashboardCountData, MessagesHistory} from './dashboard.objects';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dashboard_count_data = new DashboardCountData();
  public daily_messages_count = new MessagesHistory();
  public message_history_ref_day = 0;
  public loading = false;
  constructor() { }

  ngOnInit() {
  }

  public moveDailyMessageHistory(id) {

  }
}
