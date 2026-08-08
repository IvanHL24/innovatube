import { Routes } from '@angular/router';
import { authRoutes } from './layouts/auth-layout/auth.routes';
import { mainRoutes } from './layouts/main-layout/main.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes
    },
    {
        path: '',
        children: mainRoutes
    }
];
