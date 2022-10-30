import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  myUser:any
  api:string = "http://localhost:4000/";
  
  constructor(private _http: HttpClient) { };

  register(data: User, userType:string): Observable<any>{
      return this._http.post(`${this.api}register`, {...data, userType: userType})
    }

  loginUser(data: any): Observable<any>{
    return this._http.post(`${this.api}login`, data)
  }

  getProfile(): Observable<any>{
    return this._http.get(`${this.api}profile`)
  };

  logOut(): Observable<any>{
    return this._http.post(`${this.api}logout`, null)
  }

  editProfile(newData: any): Observable<any> {
    return this._http.patch(`${this.api}editProfile`,newData)
  }

  deleteAcc(): Observable<any>{
    return this._http.delete(`${this.api}deleteProfile`)
  }
}
