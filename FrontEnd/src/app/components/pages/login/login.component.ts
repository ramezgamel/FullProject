import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error:string = ''

  constructor(private _data:DataService) { }

  handleLogin(form: NgForm){
    if(form.invalid) return;
    this.isLoading = true
    this._data.loginUser(form.value).subscribe(
      res=> {
        console.log(res)
        this.isLoading = false
      },
      err => {
        this.error = err.error.message
        this.isLoading = false;
      }
      )
  }


  ngOnInit(): void {
  }

}
