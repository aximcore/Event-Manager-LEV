import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin-frame',
    templateUrl: './admin-frame.component.html',
    styleUrls: ['./admin-frame.component.css']
})
export class AdminFrameComponent implements OnInit {

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    logOut() {
        Cookie.set('loggedin', 'false');
        this.router.navigate(['admin', 'login']);
    }

}
