import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AdminModule} from './admin';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {HomeComponent} from './home/home.component';
import {LocationService} from './service';
import {EventService} from './service/event.service';
import {UserService} from './service/user.service';
import {HttpClientModule} from '@angular/common/http';
import {FrameComponent} from './frame/frame.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FrameLoginComponent} from './frame/frame-login/frame-login.component';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSidenavModule,
    MatSortModule, MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {FrameRegisterComponent} from './frame/frame-register/frame-register.component';
import {FrameEventComponent} from './frame/frame-event/frame-event.component';


@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        FormsModule,
        AdminModule,
        HttpClientModule,
        routing,
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
        AppComponent,
        HomeComponent,
        FrameComponent,
        FrameLoginComponent,
        FrameRegisterComponent,
        FrameEventComponent
    ],
    providers: [
        LocationService,
        EventService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
