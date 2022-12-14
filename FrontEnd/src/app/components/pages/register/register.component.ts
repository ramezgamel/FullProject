import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  file: any;
  isLoading = false;
  error:string = '';
  isSubmitted = false;
  selector: string = "patient";

  constructor(private _Auth:AuthService, 
      private _router:Router) {}

  onSelect(){
    this.selector == 'patient'? this.selector = 'doctor': this.selector = 'patient';
  }
  
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    gender: new FormControl("", [Validators.required]),
    dateOfBirth: new FormControl("", [Validators.required])
  });
  registerForm2 = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ID: new FormControl("", [Validators.required]),
    specialty: new FormControl("", [Validators.required])
  });

  get name() {return this.registerForm.get("name")};
  get email() {return this.registerForm.get("email")};
  get password() {return this.registerForm.get("password")};
  get gender() {return this.registerForm.get("gender")};
  get dateOfBirth() {return this.registerForm.get("dateOfBirth")};

  get name2() {return this.registerForm2.get("name")};
  get email2() {return this.registerForm2.get("email")};
  get password2() {return this.registerForm2.get("password")};
  get ID() {return this.registerForm2.get("ID")};
  get specialty() {return this.registerForm2.get("specialty")};

  
  handleForm(userType:string){
    this.error = ''
    this.isSubmitted= true;
    this.isLoading = true;
    let data: User|any
    if(userType == 'doctor'){
      if(this.registerForm2.invalid) return
      data = this.registerForm2.value;
    }
    if(userType == 'patient'){
      if(this.registerForm.invalid) return
      data = this.registerForm.value;
    }
    this._Auth.register(data,userType).subscribe(
      res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(res)
        this.isLoading = false;
        this._router.navigate(['login'])
      }, 
      err => {
        this.error = err.error.message
        this.isLoading = false
      })
  };

}
