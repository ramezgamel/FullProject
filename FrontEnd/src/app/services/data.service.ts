import { Article, Replay } from './../interfaces/article';
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

  getByCategory(category: string): Observable<any>{
    return this._Http.get(`${this.api}all/${category}`)
  };

  getSingle(id: string): Observable<any>{
    return this._Http.get(`${this.api}single/${id}`)
  };
  
  addArticle(article:Article): Observable<any>{
    return this._Http.post(`${this.api}add`,article)
  }

  addComment(comment:Comment,articleId:string): Observable<any>{
    return this._Http.post(`${this.api}addComment/${articleId}`,comment);
  };

  addReplay(replay:Replay,articleID:string, commentID:string): Observable<any>{
    return this._Http.post(`${this.api}addReplay/${articleID}/${commentID}`,replay);
  }

  likeArticle(articleId:string){
    return this._Http.post(`${this.api}/like/${articleId}`, null)
  }
}
