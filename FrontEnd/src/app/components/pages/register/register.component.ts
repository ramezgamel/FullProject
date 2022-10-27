import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  error:string = '';
  isSubmitted = false
  
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    gender: new FormControl("", [Validators.required]),
    dateOfBirth: new FormControl("", [Validators.required])
  });

  get name() {return this.registerForm.get("name")};
  get email() {return this.registerForm.get("email")};
  get password() {return this.registerForm.get("password")};
  get gender() {return this.registerForm.get("gender")};
  get dateOfBirth() {return this.registerForm.get("dateOfBirth")};

  constructor(private _data:AuthService, 
      private _router:Router) { }
  
  ngOnInit(): void {
  }

  handleForm(){
    console.log(this.registerForm.value)
    this.isSubmitted= true;
    if(this.registerForm.invalid) return;
    this.isLoading = true
    let data : User|any = this.registerForm.value
    this._data.register(data).subscribe(
      res => {
        this.isLoading = false;
        this._router.navigate(['login'])
      }, 
      err => {
        this.error = err;
        this.isLoading = false
      })
  }
}
