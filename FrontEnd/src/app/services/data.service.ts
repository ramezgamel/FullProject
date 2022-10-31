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

  getSingle(id: string): Observable<any>{
    return this._Http.get(`${this.api}single/${id}`)
  };
  
  addArticle(article:Article): Observable<any>{
    return this._Http.post(`${this.api}add`,article)
  };

  getAppointment(bookingForm: any, doctorId: string){
    return this._Http.post(`http://localhost:4000/booking/${doctorId}`,bookingForm)
  };

  addComment(comment:any,articleId:string): Observable<any>{
    return this._Http.post(`${this.api}addComment/${articleId}`,comment);
  };

  likeArticle(articleId:string){
    return this._Http.post(`${this.api}/like/${articleId}`, null)
  };

  editComments(commentId: any, articleId: any, data:any){
    return this._Http.patch(`${this.api}editComment/${articleId}/${commentId}`, data)
  };

  delArticle(articleId: any){
    return this._Http.delete(`${this.api}${articleId}`)
  }

// ===================================================================================================

  getByCategory(category: string): Observable<any>{
    return this._Http.get(`${this.api}all/${category}`)
  };

  addReplay(replay:Replay,articleId:string, commentId:string): Observable<any>{
    return this._Http.post(`${this.api}addReplay/${articleId}/${commentId}`,replay);
  };

  // b2y functions l delete

  deleteComment(articleId: any, commentId: any){
    return this._Http.delete(`${this.api}${articleId}/${commentId}`)
  }
}
