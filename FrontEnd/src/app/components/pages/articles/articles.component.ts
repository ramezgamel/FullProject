import { Article } from './../../../interfaces/article';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] =[];
  searchContent = this.articles;
  constructor(private _data:DataService, private _Auth:AuthService) { }
  
  ngOnInit(): void {
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
    console.log(data)
    this._data.addArticle(data).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  };

  getData() {
    this._data.getAll().subscribe(
      res => {
        this.articles = res.data
      },
      err => console.log(err)
    )
  };

  search(value: string){
    this.searchContent = this.searchContent.filter(article => article.title.includes(value))
  }

}
