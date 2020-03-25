/**
 * Created by BENGEOS on 3/22/20.
 */
import {SubCity} from './sub-cities/sub-cities.object';

export class Kebele {
    public id: number;
    public sub_city_id: number;
    public subCity: SubCity;
    public name: string;
    public latitude: string;
    public longitude: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.latitude = '';
        this.longitude = '';
        this.description = '';
    }
}




