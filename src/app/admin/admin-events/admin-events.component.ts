import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {EventObject} from '../../model';
import {EventService} from '../../service';

@Component({
    selector: 'app-admin-events',
    templateUrl: './admin-events.component.html',
    styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

    displayedColumns = ['name', 'action'];
    dataSource = null;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.eventService.findAll().subscribe(events => {
            this.dataSource = new MatTableDataSource<EventObject>(events);
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
