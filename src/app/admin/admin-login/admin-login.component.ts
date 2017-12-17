import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {UserService} from '../../service/user.service';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    public username: string = '';
    public password: string = '';

    constructor(private router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.userService.logIn(this.username, this.password).subscribe(() => {
            this.router.navigate(['admin']);
        });
    }

}
