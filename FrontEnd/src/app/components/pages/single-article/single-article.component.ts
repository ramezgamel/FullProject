import { Article } from './../../../interfaces/article';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {
  article:Article = {
    userId: '',
    title: '',
    body: ''
  }

  constructor(private _data:DataService, private _ActivatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.showSingle()
  };

  showSingle(){
    let id = this._ActivatedRouter.snapshot.params['articleId'];
    this._data.getSingle(id).subscribe(
      res => {
        console.log(res)
        this.article = res.data
      },
      err => console.log(err)
    )
  }

}
