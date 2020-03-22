import {Component, OnInit} from '@angular/core';
import {Zone} from './zones/zones.objects';
import {Region} from './regions/regions.objects';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public selectedRegion = new Region();
    public selectedZone = new Zone();

    constructor() {
    }

    ngOnInit() {
    }

    public onSelectRegion(event: Region) {
        console.log('SELECTED REGION: ', event);
        this.selectedRegion = event;
    }

    public onSelectZone(event: Zone) {
        console.log('SELECTED ZONE: ', event);
        this.selectedZone = event;
    }
}
