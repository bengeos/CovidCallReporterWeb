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
    {path: '/admin/team_contacts', title: 'Team', icon: 'group', class: ''},
    {path: '/admin/followups', title: 'Followup', icon: 'device_hub', class: ''},
    {path: '/admin/rapid_response', title: 'Rapid Response', icon: 'flight_takeoff', class: ''},
    {path: '/admin/users', title: 'Users', icon: 'person', class: ''},
    {path: '/admin/settings', title: 'Settings', icon: 'settings', class: ''},
];
// Administrator
export const ADMINISTRATOR: RouteInfo[] = [
    {path: '/admin/dashboards', title: 'Dashboards', icon: 'dashboard', class: ''},
    {path: '/admin/call_reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
    {path: '/admin/reports', title: 'Reports', icon: 'assignment', class: ''},
    {path: '/admin/team_contacts', title: 'Team', icon: 'group', class: ''},
    {path: '/admin/followups', title: 'Followup', icon: 'device_hub', class: ''},
    {path: '/admin/rapid_response', title: 'Rapid Response', icon: 'flight_takeoff', class: ''},
    {path: '/admin/users', title: 'Users', icon: 'person', class: ''},
];
// For Call Reporters
export const CALL_REPORTERS: RouteInfo[] = [
    {path: '/admin/call_reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
];

// Task Force Reporters
export const RUMOR_INVESTIGATION: RouteInfo[] = [
    {path: '/admin/reports', title: 'Call Report', icon: 'dialer_sip', class: ''},
];

// Followup Response Team
export const FOLLOWUP_TEAM: RouteInfo[] = [
    {path: '/admin/team_contacts', title: 'Team', icon: 'group', class: ''},
    {path: '/admin/followups', title: 'Followup', icon: 'device_hub', class: ''},
];

// Followup Response Team
export const RAPID_RESPONSE_TEAM: RouteInfo[] = [
    {path: '/admin/team_contacts', title: 'Team', icon: 'group', class: ''},
    {path: '/admin/rapid_response', title: 'Rapid Response', icon: 'flight_takeoff', class: ''},
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
        if (this.authService.getUserRoleId() === '2') {
            this.menuItems = ADMINISTRATOR.filter(menuItem => menuItem);
        } else if (this.authService.getUserRoleId() === '3') {
            this.menuItems = CALL_REPORTERS.filter(menuItem => menuItem);
        } else if (this.authService.getUserRoleId() === '4') {
            this.menuItems = RUMOR_INVESTIGATION.filter(menuItem => menuItem);
        } else if (this.authService.getUserRoleId() === '5') {
            this.menuItems = RAPID_RESPONSE_TEAM.filter(menuItem => menuItem);
        } else if (this.authService.getUserRoleId() === '6') {
            this.menuItems = FOLLOWUP_TEAM.filter(menuItem => menuItem);
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
