import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private _Auth:AuthService) { }

  ngOnInit(): void {
    this._Auth.getProfile().subscribe(
      res => {
        this._Auth.isLoggedIn = true;
        this._Auth.myUser = res.data.user
        this.editForm.patchValue(res.data.user)
    })

  };

  editForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    dateOfBirth: new FormControl("", [Validators.required]),
  });

  editProfile(){
    this._Auth.editProfile(this.editForm.value).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  };

}
