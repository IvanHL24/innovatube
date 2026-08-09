import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VideoCardComponent } from '../../../shared/video-card/video-card.component';
import { YoutubeService } from '../../../core/services/youtube.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { Favorite, VideoCardData } from '../../../core/models/favorite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-videos-search',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, VideoCardComponent],
  templateUrl: './videos-search.component.html',
  styleUrl: './videos-search.component.scss'
})
export class VideosSearchComponent {

  searchTerm = '';
  videos: VideoCardData[] = [];
  favoriteVideoIds = new Set<string>();
  loading = false;
  searchPerformed = false;
  errorMessage = '';

  constructor(
    private youtubService: YoutubeService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  searchVideos(): void {
    const query = this.searchTerm.trim();
    if (!query) {
      return;
    }
    this.loading = true;
    this.searchPerformed = true;
    this.youtubService.search(query).subscribe({
      next: (data) => {
        this.videos = data.map(video => ({
          youtube_video_id: video.id.videoId,
          title: video.snippet.title,
          image: video.snippet.thumbnails.high.url
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching videos:', error);
        this.loading = false;
        this.errorMessage = 'No fue posible obtener los videos.';
        this.videos = [];
      }
    })
  }

  loadFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => {
        this.favoriteVideoIds = new Set(
          data.map((data: Favorite) => data.youtube_video_id)
        )
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
      }
    })
  }

  isFavorite(videoId: string): boolean {
    return this.favoriteVideoIds.has(videoId);
  }

  toggleFavorite(favorite: VideoCardData): void {
    if (this.isFavorite(favorite.youtube_video_id)) {
      this.deletFavorite(favorite.youtube_video_id);
      return;
    }

    this.addFavorite(favorite);
  }

  private addFavorite(favorite: VideoCardData): void {
    this.favoriteService.saveFavorite(favorite).subscribe({
      next: (data) => {
        this.favoriteVideoIds.add(favorite.youtube_video_id);
        this.favoriteVideoIds = new Set(
          this.favoriteVideoIds
        )
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
        console.error('Error adding favorite:', error);
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

  private deletFavorite(videoId: string): void {
    this.favoriteService.deleteFavorite(videoId).subscribe({
      next: (data) => {
        this.favoriteVideoIds.delete(videoId);
        this.favoriteVideoIds = new Set(
          this.favoriteVideoIds
        )
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
        console.error('Error removing favorite:', error);
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
