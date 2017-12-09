import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
    {
        path: '', component: HomeComponent, children: []
    },
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
