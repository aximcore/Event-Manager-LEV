import {Component, OnInit, Output} from '@angular/core';
import {PerformerObject} from '../../../model';
import {PerformerService} from '../../../service';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'app-admin-perfomers-edit',
    templateUrl: './admin-perfomers-edit.component.html',
    styleUrls: ['./admin-perfomers-edit.component.css']
})
export class AdminPerfomersEditComponent implements OnInit {

    displayedColumns = ['name', 'genre', 'website'];
    genres = [
        {value: 'male', viewValue: 'Male'},
        {value: 'female', viewValue: 'Female'}
    ];
    @Output()
    public performer: PerformerObject = <PerformerObject>{};

    constructor(private perfomerService: PerformerService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.perfomerService.findById(params['id']).subscribe(performer => {
                if (performer) {
                    this.performer = performer;
                }
            });
        });
    }

    onSubmit() {
        this.perfomerService.save(this.performer);
    }
}
