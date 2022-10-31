import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  error:string = '';
  isSubmitted = false;

  loginForm = new FormGroup({
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    )
  });
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}
  
  constructor(private _Auth:AuthService, private _router:Router) { }

  handleLogin(){
    this.error = ''
    this.isSubmitted = true
    this.isLoading = true
    if(this.loginForm.invalid) return;
    this._Auth.loginUser(this.loginForm.value).subscribe(
      res=> {
        localStorage.setItem("token", res.data.token)
        this._Auth.isLoggedIn = true;
        this._Auth.myUser = res.data.user
        this.isLoading = false;
        this._router.navigate(['/profile'])
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
