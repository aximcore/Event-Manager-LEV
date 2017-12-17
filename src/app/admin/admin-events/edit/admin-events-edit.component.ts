import {Component, OnInit, Output} from '@angular/core';
import {EventObject} from '../../../model';
import {EventService} from '../../../service';
import {ActivatedRoute} from '@angular/router';

@Component({
    templateUrl: './admin-events-edit.component.html',
    styleUrls: ['./admin-events-edit.component.css']
})
export class AdminEventsEditComponent implements OnInit {

    displayedColumns = ['name', 'action'];
    @Output()
    public event: EventObject = <EventObject>{};

    constructor(private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.eventService.findById(params['id']).subscribe(event => {
                if(event) {
                    this.event = event;
                }
            });
        })
    }

    onSubmit() {
        this.eventService.save(this.event);
    }

}
