import {Component, OnInit} from '@angular/core';
import {AuthServicesService} from '../../services/auth-services.service';

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
    {path: '/admin/reports', title: 'Reports', icon: 'assignment', class: ''},
    {path: '/admin/rapid_response', title: 'Rapid Response', icon: 'flight_takeoff', class: ''},
    {path: '/admin/followups', title: 'Followup', icon: 'device_hub', class: ''},
    // {path: '/admin/others', title: 'Others Team', icon: 'flight_takeoff', class: ''},
    {path: '/admin/users', title: 'Users', icon: 'person', class: ''},
    {path: '/admin/settings', title: 'Settings', icon: 'settings', class: ''},
];
// For Call Reporters
export const CALL_REPORTERS: RouteInfo[] = [
    {path: '/admin/dashboards', title: 'Dashboards', icon: 'dashboard', class: ''},
    {path: '/admin/call_reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
];

// Task Force Reporters
export const TASK_FORCE: RouteInfo[] = [
    {path: '/admin/dashboards', title: 'Dashboards', icon: 'dashboard', class: ''},
    {path: '/admin/reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private authService: AuthServicesService) {
    }

    ngOnInit() {
        if (this.authService.getUserRoleId() === '3') {
            this.menuItems = CALL_REPORTERS.filter(menuItem => menuItem);
        } else if (this.authService.getUserRoleId() === '4') {
            this.menuItems = TASK_FORCE.filter(menuItem => menuItem);
        } else {
            this.menuItems = ROUTES.filter(menuItem => menuItem);
        }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    public logout() {
        this.authService.logOut();
    }
}
