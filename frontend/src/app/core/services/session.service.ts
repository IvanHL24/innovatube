import { Injectable } from '@angular/core';
import { ForgotPassword, LoginRequest, ResetPassword, User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import config from '../../../assets/config/config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private httpHeader: HttpHeaders;

  private url: string;

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.url = config.service;
    this.httpHeader = new HttpHeaders().set('Content-Type', 'application/json');
  }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this._http.post<any>(this.url+'auth/login', loginRequest, {headers: this.httpHeader})
  }

  public forgotPassword(forgotPassword: ForgotPassword): Observable<any> {
    return this._http.post<any>(this.url+'auth/forgot-password', forgotPassword, {headers: this.httpHeader})
  }

  public resetPassword(resetPassword: ResetPassword): Observable<any> {
    return this._http.post<any>(this.url+'auth/reset-password', resetPassword, {headers: this.httpHeader})
  }

  public userInfo(): Observable<any> {
    return this._http.post<any>(this.url+'auth/login', {headers: this.httpHeader.append('Authorization', 'Bearer'+localStorage.getItem('token'))})
  }
}
