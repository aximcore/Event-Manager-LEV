import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return new Observable<boolean>(response => {
            this.userService.getCurrentUser().subscribe(user => {
                response.next(true);
                response.complete();
            }, error => {
                response.next(false);
                this.router.navigate(['admin', 'login']);
                response.complete();
            });
        });
    }
}
