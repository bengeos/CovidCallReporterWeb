import {Component, OnInit} from '@angular/core';
import {ChartObject, DashboardCountData, RegionalCallReport, ReportsHistory} from './dashboard.objects';
import * as Chartist from 'chartist';
import {DashboardsService} from "../services/dashboards.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public dashboard_count_data = new DashboardCountData();
    public daily_reports_history = new ReportsHistory();
    public regionalCallReports: RegionalCallReport[] = [];
    public message_history_ref_day = 0;
    public loading = false;

    constructor(private dashboardsServices: DashboardsService) {
    }

    ngOnInit() {
        this.dashboardsServices.getDashboardCountData();
        this.dashboardsServices.getRegionalCallReports();
        this.dashboardsServices.getReportsHistory(this.message_history_ref_day);
        this.dashboardsServices.DashboardCountDataEmitter.subscribe(
            data => {
                this.dashboard_count_data = data;
                this.loading = false;
            }
        );
        this.dashboardsServices.DashboardReportsHistoryEmitter.subscribe(
            data => {
                this.daily_reports_history = data;
                this.processDailyReportsHistory(data);
                this.loading = false;
            }
        );
        this.dashboardsServices.RegionalCallReports.subscribe(
            data => {this.regionalCallReports = data}
        );
    }

    public moveDailyMessageHistory(num: number) {
      this.loading = true;
      this.message_history_ref_day = this.message_history_ref_day + num;
      this.dashboardsServices.getReportsHistory(this.message_history_ref_day);
    }

    private startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });
        seq2 = 0;
    };

    private processDailyReportsHistory(reportsHistory: ReportsHistory) {
        const dailyReportChart = new ChartObject();
        dailyReportChart.series = [reportsHistory.call_reports_count, reportsHistory.community_reports_count,
            reportsHistory.travel_reports_count];
        dailyReportChart.labels = reportsHistory.record_date;
        const reportsChartOptions = {
            high: 0,
            low: 0,
            scaleMinSpace: 5,
            seriesBarDistance: 15,
            onlyInteger: true,
            showArea: true,
            fullWidth: true,
            showLabel: true,
            axisX: {
                showLabel: true,
                showGrid: true
            },
            referenceValue: 5
        };
        const responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];
        const total = (Math.max.apply(Math, reportsHistory.call_reports_count)
            + Math.max.apply(Math, reportsHistory.community_reports_count)
            + Math.max.apply(Math, reportsHistory.travel_reports_count));
        reportsChartOptions.high = Math.floor((total / 3) + 1);
        const sentChart = new Chartist.Bar('#DailySentMessagesChart', dailyReportChart, reportsChartOptions, responsiveOptions);
        this.startAnimationForBarChart(sentChart);
    }
}
