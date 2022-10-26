import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error:string = ''
  user: any = {
    name:"ramez",
    email:"ramge@test.com",
    password:"54654",
    userName:"ramezgamel"
  }
  constructor(private _data:DataService) { }
  
  ngOnInit(): void {
  }

  handleForm(form:NgForm){
    if(form.invalid) return;
    this.isLoading = true
    this._data.register(form.value).subscribe(
      res => {
        console.log(res)
        this.isLoading = false
      }, 
      err => {
        this.error = err;
        this.isLoading = false
      })
  }
}
