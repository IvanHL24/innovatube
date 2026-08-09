import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { VideoCardData } from '../../core/models/favorite.model';

@Component({
  selector: 'app-video-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.scss'
})
export class VideoCardComponent {

  @Input({ required: true})
  video!: VideoCardData;

  @Input()
  isFavorite = false;

  @Output()
  toggleFavorite = new EventEmitter<VideoCardData>();

  onFavoriteToggle(): void {
    this.toggleFavorite.emit(this.video);
  }

  openVideo(): void {
    window.open(`https://www.youtube.com/watch?v=${this.video.youtube_video_id}`, '_blank');
  }

}
