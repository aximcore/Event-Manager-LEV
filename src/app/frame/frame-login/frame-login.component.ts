import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';

@Component({
    selector: 'app-frame-login',
    templateUrl: './frame-login.component.html',
    styleUrls: ['./frame-login.component.css']
})
export class FrameLoginComponent implements OnInit {

    public username: string;
    public password: string;
    public loggedIn: boolean = true;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    onSubmit() {
        this.userService.logIn(this.username, this.password).subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        }, error => {
            console.error(error);
        });
    }

}
