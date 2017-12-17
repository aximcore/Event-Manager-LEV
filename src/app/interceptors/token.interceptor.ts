import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Cookie} from 'ng2-cookies';

export class TokenInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers: HttpHeaders = request.headers.set('Content-Type', 'application/json');
        if(Cookie.get('token')) {
            headers = headers.set('Authorization', Cookie.get('token'));
        }

        request = request.clone({
            headers: headers
        });
        return next.handle(request);
    }

}