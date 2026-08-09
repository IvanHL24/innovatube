import { Component } from '@angular/core';
import { FavoriteService } from '../../../core/services/favorite.service';
import { Favorite } from '../../../core/models/favorite.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { VideoCardComponent } from "../../../shared/video-card/video-card.component";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-favorites-list',
  imports: [FormsModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule, VideoCardComponent, MatInputModule],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss'
})
export class FavoritesListComponent {

  favorites: Favorite[] = [];
  filteredFavorites: Favorite[] = [];
  searchTerm = '';
  loading = false;
  errorMessage = '';

  constructor(
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.loading = true;
    this.errorMessage = '';
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data;
        this.filteredFavorites = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.favorites = [];
        this.filteredFavorites = [];
        this.errorMessage = error.error.message;
        this.loading = false;
      }
    });
  }

  filterFavorites(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredFavorites = this.favorites;
      return;
    }
    this.filteredFavorites = this.favorites.filter(favorite => favorite.title.toLowerCase().includes(term));
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredFavorites = this.favorites;
  }

  deleteFavorite(youtubeVideoId: string): void{
    this.favoriteService.deleteFavorite(youtubeVideoId).subscribe({
      next: (data) => {
        this.favorites = this.favorites.filter(favorite => favorite.youtube_video_id !== youtubeVideoId);
        this.filteredFavorites = this.filteredFavorites.filter(favorite => favorite.youtube_video_id !== youtubeVideoId);
        Swal.fire({
          toast: true,
          position: 'center',
          showConfirmButton: false,
          timer: 2000,
          title: data.message,
          icon: 'success'
        })
      },
      error: (error) => {
        console.error('Error removing favorite:',error);
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }
}
