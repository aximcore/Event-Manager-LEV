import {Component, OnInit, Output} from '@angular/core';
import {EventObject} from '../../../model';
import {EventService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    templateUrl: './admin-events-edit.component.html',
    styleUrls: ['./admin-events-edit.component.css']
})
export class AdminEventsEditComponent implements OnInit {

    displayedColumns = ['name', 'action'];
    @Output()
    public event: EventObject = <EventObject>{};

    constructor(private eventService: EventService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.eventService.findById(params['id']).subscribe(event => {
                if (event) {
                    this.event = event;
                }
            });
        });
    }

    onSubmit() {
        this.eventService.save(this.event);
        this.snackBar.open('Successfully saved!', '', {duration: 2000, horizontalPosition: 'center'});
        this.router.navigate(['admin', 'events']);
    }

}
