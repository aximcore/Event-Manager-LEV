import {Component, OnInit} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {UserService} from '../../service';

@Component({
    selector: 'app-admin-frame',
    templateUrl: './admin-frame.component.html',
    styleUrls: ['./admin-frame.component.css']
})
export class AdminFrameComponent implements OnInit {

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    logOut() {
        this.userService.logOut();
        this.router.navigate(['admin', 'login']);
    }

}
