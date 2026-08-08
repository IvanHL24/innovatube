import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../assets/config/config.json'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = config.service;
  }

  public search(param: string): Observable<any> {

    if (param) {
      return this._http.get<any>(this.url+'videos/search?q='+param);
    }

    return this._http.get<any>(this.url+'videos/search');
  }
}
