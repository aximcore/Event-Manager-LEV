import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
    MatNativeDateModule,
    MatPaginatorModule, MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

import {AdminGuard, AdminInverseGuard} from './guards';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminLocationsComponent} from './admin-locations/admin-locations.component';
import {AdminFrameComponent} from './admin-frame/admin-frame.component';
import {AdminEventsComponent} from './admin-events/admin-events.component';
import {AdminEventsEditComponent} from './admin-events/edit/admin-events-edit.component';

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
        MatSortModule,
        MatTableModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        AdminLoginComponent,
        AdminLocationsComponent,
        AdminFrameComponent,
        AdminEventsComponent,
        AdminEventsEditComponent
    ],
    providers: [
        AdminGuard,
        AdminInverseGuard
    ]
})
export class AdminModule {
}
