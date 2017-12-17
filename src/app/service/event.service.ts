import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Event} from '../model';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<Event[]> {
        return this.http.get<Event[]>('http://api.event.aio.nestquick.me/event/all');
    }

}
