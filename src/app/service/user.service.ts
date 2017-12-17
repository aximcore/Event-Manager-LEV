import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {User} from '../model';
import {HttpClient} from '@angular/common/http';

const jQuery = window['$'];

@Injectable()
export class UserService {

    public loggedInSubject: Subject<boolean> = new Subject<boolean>();
    public loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

    public user: User;

    constructor(private router: Router, private http: HttpClient) {
    }

    getCurrentUser(): Observable<User> {
        return new Observable<User>(response => {
            if(Cookie.get('token')) {
                this.http.get<User>('/auth/user', {
                    params: { token: Cookie.get('token') }
                }).subscribe(user => {
                    if(user) {
                        response.next(user);
                        this.loggedInSubject.next(true);
                    } else {
                        response.error(null);
                        this.loggedInSubject.next(false);
                    }
                    response.complete();
                });
            } else {
                this.loggedInSubject.next(false);
                response.complete();
            }
        });
    }

    logIn(username: string, password: string): Observable<boolean> {
        return new Observable<boolean>(response => {
            this.http.post<any>(
                '/auth',
                {username: username, password: password}
            ).subscribe(user => {
                Cookie.set('token', user.token, null, '/');
                jQuery('#login-modal .close').trigger('click');
                this.user = user;
                this.loggedInSubject.next(true);
                response.next(true);
                response.complete();
            }, error => {
                this.loggedInSubject.next(false);
                console.error(error);
                response.complete();
            });
        });
    }

    logOut() {
        Cookie.delete('token', '/');
        this.loggedInSubject.next(false);
    }

}
