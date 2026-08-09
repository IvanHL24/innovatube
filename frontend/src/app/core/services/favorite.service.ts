import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../assets/config/config.json';
import { Favorite, VideoCardData } from '../models/favorite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private httpHeader: HttpHeaders;

  private url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = config.service;
    this.httpHeader = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public saveFavorite(favorite: VideoCardData): Observable<any> {
    return this._http.post<any>(this.url+'favorites/create', favorite, {headers: this.httpHeader.append('Authorization', 'Bearer '+localStorage.getItem('token'))})
  }

  public getFavorites(): Observable<any> {
    return this._http.get<any>(this.url+'favorites/search', {headers: this.httpHeader.append('Authorization', 'Bearer '+localStorage.getItem('token'))})
  }

  public deleteFavorite(favoriteId: string): Observable<any> {
    return this._http.delete<any>(this.url+'favorites/delete/'+favoriteId, {headers: this.httpHeader.append('Authorization', 'Bearer '+localStorage.getItem('token'))})
  }
}
