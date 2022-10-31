import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  error = ''
  constructor(private _data:DataService, private _Auth:AuthService) { }

  ngOnInit(): void {
  }

  booking(form: any){
    this.error = ''
    this._data.getAppointment(form.value, form.value.doctorName).subscribe(
      res => console.log(res),
      err => {
        this.error = err.error.message
      }
    )
  }
}
