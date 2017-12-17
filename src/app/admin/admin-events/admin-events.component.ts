import {Component, OnInit, ViewChild} from '@angular/core';
import {Location} from '../../model';
import {LocationService} from '../../service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-admin-events',
    templateUrl: './admin-events.component.html',
    styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

    displayedColumns = ['name', 'city', 'amenity'];
    dataSource = null;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private locationService: LocationService) {
    }

    ngOnInit() {
        this.locationService.findAll().subscribe(locations => {
            this.dataSource = new MatTableDataSource<Location>(locations);
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
