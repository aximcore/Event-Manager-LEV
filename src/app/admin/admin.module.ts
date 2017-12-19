import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
    MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';

import {AdminGuard, AdminInverseGuard} from './guards';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminLocationsComponent} from './admin-locations/admin-locations.component';
import {AdminFrameComponent} from './admin-frame/admin-frame.component';
import {AdminEventsComponent} from './admin-events/admin-events.component';
import {AdminEventsEditComponent} from './admin-events/edit/admin-events-edit.component';
import {AdminPerformersComponent} from './admin-performers/admin-performers.component';
import { AdminPerfomersEditComponent } from './admin-performers/admin-perfomers-edit/admin-perfomers-edit.component';

@NgModule({
    exports: [
        AdminLoginComponent,
        AdminLocationsComponent,
        AdminFrameComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule
    ],
    declarations: [
        AdminLoginComponent,
        AdminLocationsComponent,
        AdminFrameComponent,
        AdminEventsComponent,
        AdminEventsEditComponent,
        AdminPerformersComponent,
        AdminPerfomersEditComponent
    ],
    providers: [
        AdminGuard,
        AdminInverseGuard
    ]
})
export class AdminModule {
}
