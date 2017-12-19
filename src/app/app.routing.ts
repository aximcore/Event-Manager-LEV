import {Routes, RouterModule} from '@angular/router';

import {FrameHomeComponent} from './frame/frame-home/frame-home.component';
import {AdminGuard, AdminInverseGuard} from './admin/guards';
import {AdminLoginComponent} from './admin/admin-login/admin-login.component';
import {AdminLocationsComponent} from './admin/admin-locations/admin-locations.component';
import {AdminFrameComponent} from './admin/admin-frame/admin-frame.component';
import {FrameComponent} from './frame/frame.component';
import {AdminEventsComponent} from './admin/admin-events/admin-events.component';
import {AdminEventsEditComponent} from './admin/admin-events/edit/admin-events-edit.component';
import {FrameDetailComponent} from './frame/frame-detail/frame-detail.component';
import {AdminPerformersComponent} from './admin/admin-performers/admin-performers.component';
import {AdminPerfomersEditComponent} from './admin/admin-performers/admin-perfomers-edit/admin-perfomers-edit.component';
import {FrameEventComponent} from './frame/frame-event/frame-event.component';
import {FramePerformerComponent} from './frame/frame-performer/frame-performer.component';

const appRoutes: Routes = [
    {
        path: '', component: FrameComponent, children: [
            {path: '', component: FrameHomeComponent},
            {path: 'events', component: FrameEventComponent},
            {path: 'event/:id', component: FrameDetailComponent},
            {path: 'performers', component: FramePerformerComponent}
        ]
    },
    {
        path: 'admin', children: [
            {
                path: '', component: AdminFrameComponent, canActivate: [AdminGuard], children: [
                    {path: '', redirectTo: '/admin/locations', pathMatch: 'full'},
                    {path: 'locations', component: AdminLocationsComponent},
                    {path: 'events', component: AdminEventsComponent},
                    {path: 'events/edit', component: AdminEventsEditComponent},
                    {path: 'events/edit/:id', component: AdminEventsEditComponent},

                    {path: 'performers', component: AdminPerformersComponent},
                    {path: 'performers/edit', component: AdminPerfomersEditComponent},
                    {path: 'performers/edit/:id', component: AdminPerfomersEditComponent},
                ],
            },
            {path: 'login', component: AdminLoginComponent, canActivate: [AdminInverseGuard]}
        ]
    },
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
