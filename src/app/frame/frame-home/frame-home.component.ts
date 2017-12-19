import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'event-home',
    templateUrl: './frame-home.component.html',
    styleUrls: ['./frame-home.component.css']
})
export class FrameHomeComponent implements OnInit {

    public gallery;
    private images: string[] = [
        'https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/128872/fireworks-sky-party-new-year-s-eve-128872.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/210217/pexels-photo-210217.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/437643/pexels-photo-437643.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/632722/pexels-photo-632722.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/399610/pexels-photo-399610.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/219101/pexels-photo-219101.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/262577/pexels-photo-262577.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/2143/lights-party-dancing-music.jpg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
        'https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb',
    ];

    constructor() {
    }

    ngOnInit() {
        this.gallery = this.shuffleArray(this.images).slice(0, 9);
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
