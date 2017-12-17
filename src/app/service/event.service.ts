import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {EventObject} from '../model';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class EventService {

    constructor(private http: HttpClient) {
    }

    findAll(): Observable<EventObject[]> {
        return this.http.get<EventObject[]>('/event/all');
    }

    findById(id: string): Observable<EventObject> {
        return this.http.get<EventObject>('/event', {params: {id: id}});
    }

    save(event: EventObject): void {
        this.http.post('/event', event).subscribe();
    }

}
