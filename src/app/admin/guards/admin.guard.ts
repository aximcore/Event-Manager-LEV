import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Cookie} from 'ng2-cookies';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (Cookie.get('loggedin') == 'true') {
            return true;
        } else {
            this.router.navigate(['admin', 'login']);
            return false;
        }
    }
}
