import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  api:string = "localhost:4000/article"
  constructor(private _Http: HttpClient) { 

  }

  register(data: any): Observable<any>{
      return this._Http.post("http://localhost:4000/register", data)
    }

  loginUser(data: any): Observable<any>{
    return this._Http.post("http://localhost:4000/login", data)
  }

  


}
