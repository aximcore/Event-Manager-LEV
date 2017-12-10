import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';

import {AdminComponent} from './admin.component';
import {AdminGuard, AdminInverseGuard} from './guards';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminLocationsComponent} from './admin-locations/admin-locations.component';
import {AdminFrameComponent} from './admin-frame/admin-frame.component';

@NgModule({
    exports: [
        AdminComponent,
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
    ],
    declarations: [
        AdminComponent,
        AdminLoginComponent,
        AdminLocationsComponent,
        AdminFrameComponent
    ],
    providers: [
        AdminGuard,
        AdminInverseGuard
    ]
})
export class AdminModule {
}
