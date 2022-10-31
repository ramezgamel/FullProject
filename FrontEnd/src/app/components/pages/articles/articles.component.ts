import { Article, Comment } from './../../../interfaces/article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles: Article[] =[];
  searchArticles = this.articles;
  fetched:boolean = false;
  sEdit: boolean = false;

  constructor(private _data:DataService, private _Auth:AuthService) {
    this.getData();
  }


  articleForm = new FormGroup({
    category: new FormControl("", [Validators.required]),
    title: new FormControl("", [Validators.required]),
    body: new FormControl("", [Validators.required])
  });

  addArticle(){
    let data : Article|any = this.articleForm.value;
    data.userId = this._Auth.myUser.userId;
    this._data.addArticle(data).subscribe(
      res => {
        console.log(res);
        this.getData()
      },
      err => console.log(err)
    )
  };

  getData() {
    this.fetched = true
    this._data.getAll().subscribe(
      res => {
        this.articles = res.data
        this.searchArticles = res.data
        this.fetched = false
      },
      err => console.log(err)
    )
  };

  search(value: string){
    this.searchArticles = this.articles.filter(article => article.title.includes(value));
  };

  likeArticle(articleId: any){
    this._data.likeArticle(articleId).subscribe(
      res => this.getData()
    )
  };

  addNewComment(comment:any, articleId:any){
    let co:Comment = {body: comment.body, userId: this._Auth.myUser.user._id};
    this._data.addComment(co, articleId).subscribe(
      res => {
        this.getData()
      },
      err => console.log(err)
    )
  };

  editComment(commentId:any, articleId:any, newValue:any){
    this._data.editComments(articleId, commentId, {body: newValue.value}).subscribe(
      res => {
        this.getData();
        this.sEdit = !this.sEdit
      },
      err => console.log(err)
    )
  }

  delComment(articleId: any, commentId: any){
    this._data.deleteComment(articleId, commentId).subscribe(
      res => {
        console.log(res)
        this.getData()
      },
      err => console.log(err)
    )
  };

  showEdit(){
    this.sEdit = !this.sEdit
  }

  deleteArticle(articleId: any){
    this._data.delArticle(articleId).subscribe(
      res => {
        this.getData()
      },
      err => console.log(err)
    )
  }
}
