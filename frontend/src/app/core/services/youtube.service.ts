import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../assets/config/config.json'
import { Observable } from 'rxjs';
import {  YouTubeVideo } from '../models/youtubeVideo.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = config.service;
  }

  public search(param: string): Observable<YouTubeVideo[]> {
    if (param) {
      return this._http.get<YouTubeVideo[]>(this.url+'videos/search?q='+param);
    }

    return this._http.get<YouTubeVideo[]>(this.url+'videos/search');
  }
}
