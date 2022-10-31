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
  file: any
  constructor(private _data:AuthService, 
      private _router:Router) {
      }
      
      ngOnInit(): void {
      }
      
      isLoading = false;
      error:string = '';
      isSubmitted = false;
  selector: string = "patient";
  
  onSelect(){
    this.selector == 'patient'? this.selector = 'doctor': this.selector = 'patient';
  }
  
  registerForm = new FormGroup({
    name: new FormControl("marwa", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("m@m.com", [Validators.required, Validators.email]),
    password: new FormControl("122345", [Validators.required]),
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    gender: new FormControl("male", [Validators.required]),
    dateOfBirth: new FormControl("1/1/2020", [Validators.required])
  });
  registerForm2 = new FormGroup({
    name: new FormControl("ram", [Validators.required, Validators.minLength(3)]),
    email: new FormControl("ram@test.com", [Validators.required, Validators.email]),
    password: new FormControl("1234", [Validators.required]),
    // Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    ID: new FormControl("12311", [Validators.required]),
    specialty: new FormControl("asd", [Validators.required])
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
    this.isSubmitted= true;
    this.isLoading = true;
    let data: User|any
    if(userType == 'doctor'){
      data = this.registerForm2.value;
    }
    if(userType == 'patient'){
      data = this.registerForm.value;
    }
    // if(this.registerForm.invalid) return;
    // console.log(this.file)
    // let myData:any = new FormData()
    // myData.append("img", this.file, this.file.name);
// console.log(Object.keys(data))
// Object.keys(data).forEach(k=> myData.append(k, data[k]))
// console.log(myData)
    // Object.entries(data).forEach(
    // ([key, value]) => {
    //   console.log(key, value)
    // }
    // );
// myData.append("name", data.name)
    console.log(data)
    this._data.register(data,userType).subscribe(
      res => {
        this.isLoading = false;
        this._router.navigate(['login'])
      }, 
      err => {
        this.error = err;
        this.isLoading = false
      })
  };

  changeImg(event: any){
    this.file = event.target.files[0]
  }
}
