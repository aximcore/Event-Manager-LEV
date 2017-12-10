import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Location} from '../model';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocationService {

    constructor(private http: HttpClient) {

    }

    findAll(): Observable<Location[]> {
        return this.http.get<Location[]>('http://api.event.aio.nestquick.me/location/all');
    }

}
