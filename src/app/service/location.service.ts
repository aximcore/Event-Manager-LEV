import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Location} from '../model';

import {Observable} from 'rxjs/Observable';
import {PerformerObject} from '../model/performerObject';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Location[]> {
        return this.http.get<Location[]>('/location/all');
    }

    findById(id: string): Observable<Location> {
        return this.http.get<Location>('/location', {params: {id: id}});
    }

    findByName(name: string): Observable<Location> {
        return this.http.get<Location>('/location/find', {params: {name: name}});
    }

}
