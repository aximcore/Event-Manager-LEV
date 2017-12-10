import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AdminModule} from './admin';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {HomeComponent} from './home/home.component';
import {LocationService} from './service';
import {HttpClientModule} from '@angular/common/http';
import { FrameComponent } from './frame/frame.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AdminModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        FrameComponent
    ],
    providers: [
        LocationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
