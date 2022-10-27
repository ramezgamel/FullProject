import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(public _Auth:AuthService, public _router:Router) { }

  ngOnInit(): void {
    this.profile()
  }

  logout(){
    this._Auth.logOut().subscribe(
      res => {
        localStorage.removeItem("token");
        this._Auth.isLoggedIn = false;
        this._router.navigate(['/login'])
      })
  };

  profile(){
    this._Auth.getProfile().subscribe(
      res => {
        this._Auth.isLoggedIn = true;
        this._Auth.myUser = res.data
      }
    )
  }
  
}
