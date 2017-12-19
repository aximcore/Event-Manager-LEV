import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PerformerService} from '../../service/performer.service';
import {PerformerObject} from '../../model/performerObject';

@Component({
    selector: 'app-admin-performers',
    templateUrl: './admin-performers.component.html',
    styleUrls: ['./admin-performers.component.css']
})
export class AdminPerformersComponent implements OnInit {

    displayedColumns = ['id', 'name', 'genre', 'website', 'action'];
    dataSource = null;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private perfomerService: PerformerService) {
    }

    ngOnInit() {
        this.perfomerService.findAll().subscribe(performers => {
            this.dataSource = new MatTableDataSource<PerformerObject>(performers);
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
