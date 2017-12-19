import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PerformerService} from '../../service';
import {PerformerObject} from '../../model';

@Component({
    selector: 'app-frame-performer',
    templateUrl: './frame-performer.component.html',
    styleUrls: ['./frame-performer.component.css']
})
export class FramePerformerComponent implements OnInit {


    displayedColumns = ['name', 'website', 'genre'];
    dataSource = null;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private performerService: PerformerService) {
    }

    ngOnInit() {
        this.performerService.findAll().subscribe( performers => {
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
