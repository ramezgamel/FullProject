import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles=[]
  constructor(private _data:DataService) { }


  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._data.getAll().subscribe(
      res => {
        this.articles = res.data
      }
    )
  }

}
