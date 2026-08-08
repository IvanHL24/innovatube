import { Routes } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";
import { VideosSearchComponent } from "../../components/videos/videos-search/videos-search.component";
import { FavoritesListComponent } from "../../components/favorites/favorites-list/favorites-list.component";

export const mainRoutes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
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