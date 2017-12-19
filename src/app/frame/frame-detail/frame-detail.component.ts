import {Component, OnInit} from '@angular/core';
import {EventService, LocationService, PerformerService} from '../../service';
import {ActivatedRoute} from '@angular/router';
import {EventObject} from '../../model';

@Component({
    selector: 'app-frame-detail',
    templateUrl: './frame-detail.component.html',
    styleUrls: ['./frame-detail.component.css']
})

export class FrameDetailComponent implements OnInit {

    public event: EventObject;
    public gallery;
    private images: string[] = [
        'https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/612977/pexels-photo-612977.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/160097/pexels-photo-160097.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/285598/pexels-photo-285598.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/258804/pexels-photo-258804.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/167379/pexels-photo-167379.jpeg?w=940&h=650&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/167386/pexels-photo-167386.jpeg?w=940&h=650&auto=compress&cs=tinysrgb'
    ];
    public indexpic;
    private indexpics: string[] = [
        'https://images.pexels.com/photos/423665/pexels-photo-423665.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/634617/pexels-photo-634617.png?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/207248/pexels-photo-207248.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/210332/pexels-photo-210332.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb'
    ];

    constructor(private eventService: EventService, private performerService: PerformerService, private locationService: LocationService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.gallery = this.shuffleArray(this.images).slice(0, 4);
        this.indexpic = this.shuffleArray(this.indexpics).slice(0, 1);
        this.route.params.subscribe(async params => {
            let event = await this.eventService.findById(params['id']).toPromise();
            if(event.performers) {
                for (var i in event.performers) {
                    event.performers[i] = await this.performerService.findById(event.performers[i].performerId).toPromise();
                }
            }
            if(event.locationId) {
                event.location = await this.locationService.findById(event.locationId).toPromise();
            }
            /*if(event.locationId) {
                event.location = await this.locationService.findByName(event.locationId).toPromise();
                event.location = event.location[0];
            }*/
            this.event = event;
            console.warn(this.event);
        });

    }

    shuffleArray(array) {
        let m = array.length, t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }

        return array;
    }



}
