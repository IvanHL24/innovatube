import { Routes } from '@angular/router';
import { authRoutes } from './layouts/auth-layout/auth.routes';

export const routes: Routes = [
    {
        path: "",
        children: authRoutes
    }
];
