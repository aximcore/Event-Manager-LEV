import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {LocationService} from '../../service';
import {Location} from '../../model';

@Component({
    selector: 'app-admin-locations',
    templateUrl: './admin-locations.component.html',
    styleUrls: ['./admin-locations.component.css']
})
export class AdminLocationsComponent implements OnInit {

    displayedColumns = ['id', 'name', 'city', 'amenity'];
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
