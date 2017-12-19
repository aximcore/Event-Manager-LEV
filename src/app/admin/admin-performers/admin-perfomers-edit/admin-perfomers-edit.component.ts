import {Component, OnInit, Output} from '@angular/core';
import {PerformerObject} from '../../../model';
import {PerformerService} from '../../../service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


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

    constructor(private perfomerService: PerformerService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
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
        this.snackBar.open('Successfully saved!', '', {duration: 2000, horizontalPosition: 'center'});
        this.router.navigate(['admin', 'performers']);
    }
}
