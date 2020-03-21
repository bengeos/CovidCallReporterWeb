import {Component, OnInit} from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    {path: '/admin/dashboards', title: 'Dashboards', icon: 'dashboard', class: ''},
    {path: '/admin/call_reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
    {path: '/admin/report_category', title: 'Report Category', icon: 'group_work', class: ''},
    {path: '/admin/rapid_response', title: 'Rapid Response', icon: 'flight_takeoff', class: ''},
    {path: '/admin/users', title: 'Users', icon: 'person', class: ''},
    {path: '/admin/settings', title: 'Settings', icon: 'settings', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
