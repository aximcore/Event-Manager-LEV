import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatSidenavModule,
    MatSortModule, MatTableModule,
    MatToolbarModule
} from '@angular/material'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AdminModule} from './admin';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {HomeComponent} from './home/home.component';
import {LocationService, EventService, UserService} from './service';
import {FrameComponent} from './frame/frame.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FrameLoginComponent} from './frame/frame-login/frame-login.component';
import {FrameRegisterComponent} from './frame/frame-register/frame-register.component';
import {FrameEventComponent} from './frame/frame-event/frame-event.component';
import {MockInterceptor} from './interceptors/mock.interceptor';
import {TokenInterceptor} from './interceptors/token.interceptor';

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
        {provide: HTTP_INTERCEPTORS, useClass: MockInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        LocationService,
        EventService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
