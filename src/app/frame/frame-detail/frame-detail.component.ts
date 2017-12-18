import {Component, OnInit} from '@angular/core';
import {EventService} from '../../service';
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

    constructor(private eventService: EventService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.gallery = this.shuffleArray(this.images).slice(0, 4);
        console.warn(this.gallery);
        this.route.params.subscribe(async params => {
            this.event = await this.eventService.findById(params['id']).toPromise();
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
