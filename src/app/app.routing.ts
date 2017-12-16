import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AdminGuard, AdminInverseGuard} from './admin/guards';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {AdminLocationsComponent} from './admin/admin-locations/admin-locations.component';
import {AdminFrameComponent} from './admin/admin-frame/admin-frame.component';
import {FrameComponent} from './frame/frame.component';
import {FrameLoginComponent} from './frame/frame-login/frame-login.component';

const appRoutes: Routes = [
    {
        path: '', component: FrameComponent, children: [
            {path: '', component: HomeComponent},
            {path: 'login', component: FrameLoginComponent}
        ]
    },
    {
        path: 'admin', children: [
            {
                path: '', component: AdminFrameComponent, canActivate: [AdminGuard], children: [
                    {path: '', redirectTo: '/admin/locations', pathMatch: 'full'},
                    {path: 'locations', component: AdminLocationsComponent}
                ],
            },
            {path: 'login', component: AdminLoginComponent, canActivate: [AdminInverseGuard]}
        ]
    },
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
