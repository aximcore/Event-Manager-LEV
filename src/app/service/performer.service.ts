import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {PerformerObject} from '../model/performerObject';

@Injectable()
export class PerformerService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<PerformerObject[]> {
        return this.http.get<PerformerObject[]>('/performer/all');
    }

}
