import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myUser:any
  constructor(private _Auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._Auth.getProfile().subscribe(
      res => {
        console.log(res)
      }, 
      err => console.log(err))
  }

  delAcc(){
    this._Auth.deleteAcc().subscribe(
      res => {
        localStorage.removeItem("token")
        this._router.navigate(['/register'])
      },
      err => console.log(err)
    )
  }
}
