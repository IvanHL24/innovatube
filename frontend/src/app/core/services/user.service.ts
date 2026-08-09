import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../assets/config/config.json';
import { RegisterRequest } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeader: HttpHeaders;
  private url: string;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = config.service;
    this.httpHeader = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this._http.post<any>(this.url+'users/register', registerRequest, {headers: this.httpHeader})
  }
}
