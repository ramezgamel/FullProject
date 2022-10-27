import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  api:string = "http://localhost:4000/article/"
  constructor(private _Http: HttpClient) { 

  }

  getAll(): Observable<any>{
    return this._Http.get(`${this.api}all`)
  };
  


}
