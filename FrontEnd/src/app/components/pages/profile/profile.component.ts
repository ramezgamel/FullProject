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
  constructor(private _Auth:AuthService) { }

  ngOnInit(): void {
    this._Auth.getProfile().subscribe(
      res => {
        console.log(res)
      }, 
      err => console.log(err))
  }


}
