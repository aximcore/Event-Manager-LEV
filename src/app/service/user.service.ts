import {Injectable} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

const jQuery = window['$'];

@Injectable()
export class UserService {

    public loggedInSubject: Subject<boolean> = new Subject<boolean>();
    public loggedIn: Observable<boolean> = this.loggedInSubject.asObservable();

    constructor(private router: Router) {
    }

    getCurrentUser(): void {
        if (Cookie.get('loggedin') == 'true') {
            this.loggedInSubject.next(true);
        }
    }

    logIn(username: string, password: string): Observable<boolean> {
        return new Observable<boolean>(response => {
            if (username == 'user' && password == 'user') {
                Cookie.set('loggedin', 'true');
                jQuery('#login-modal .close').trigger('click');
                //this.loggedIn = true;
                this.loggedInSubject.next(true);
                response.next(true);
                console.error('logged in');
            } else {
                //this.loggedIn = false;
                this.loggedInSubject.next(false);
                response.error('wrong credentials');
                console.error('wrong credentials');
            }
            console.log(this.loggedIn);
            response.complete();
        });
    }

    logOut() {
        Cookie.set('loggedin', 'false');
        this.loggedInSubject.next(false);
    }

}
