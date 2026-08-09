import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";
import { VideosSearchComponent } from "../../components/videos/videos-search/videos-search.component";
import { FavoritesListComponent } from "../../components/favorites/favorites-list/favorites-list.component";
import { authGuard } from "../../core/guards/auth.guard";

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: VideosSearchComponent
            },
            {
                path: 'favorites',
                component: FavoritesListComponent
            }
        ]
    }
]