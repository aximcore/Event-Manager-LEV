import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-frame',
    templateUrl: './frame.component.html',
    styleUrls: ['./frame.component.css'],
})
export class FrameComponent implements OnInit {

    public loggedIn: boolean = false;

    constructor(private modalService: NgbModal, private userService: UserService) {
    }

    open(login) {
        this.modalService.open(login);
    }

    ngOnInit() {
        this.userService.loggedIn.subscribe(value => this.loggedIn = value);
        this.userService.getCurrentUser();
    }

    logOut() {
        this.userService.logOut();
    }

}
