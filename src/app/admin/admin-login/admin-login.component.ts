import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    public username: String;
    public password: String;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    onSubmit() {
        if(this.username == 'admin' && this.password == 'admin') {
            Cookie.set('loggedin', 'true');
            this.router.navigate(['admin']);
        } else {
            console.error("wrong credentials");
        }
    }

}
