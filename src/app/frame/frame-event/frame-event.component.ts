import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../service/event.service';
import {Event} from '../../model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-frame-event',
    templateUrl: './frame-event.component.html',
    styleUrls: ['./frame-event.component.css']
})
export class FrameEventComponent implements OnInit {

    displayedColumns = ['name', 'startDate', 'endDate', 'description'];
    dataSource = null;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.eventService.findAll().subscribe(events => {
            this.dataSource = new MatTableDataSource<Event>(events);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

}
