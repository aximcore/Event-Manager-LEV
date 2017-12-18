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

    findById(id: string): Observable<PerformerObject> {
        return this.http.get<PerformerObject>('/performer', {params: {id: id}});
    }

    save(performer: PerformerObject): void {
        this.http.post('/performer', performer).subscribe();
    }
}
