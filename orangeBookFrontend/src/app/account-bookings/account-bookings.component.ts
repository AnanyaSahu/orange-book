import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-account-bookings',
  templateUrl: './account-bookings.component.html',
  styleUrls: ['./account-bookings.component.scss']
})
export class AccountBookingsComponent implements OnInit {


  public userId: any
  public bookingList = new Array<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private userService:UserService,
    private toastr: ToastrService,
    private breadcrumbService : BreadcrumbService,
    private spinner: NgxSpinnerService) {

      this.breadcrumbService.breadCrumb.next([{url: '/bookings', label: 'My Bookings'}])
    
  }


  ngOnInit() {
    this.userId = localStorage.getItem('userId')
      this.getBookings()
  }

  /**
   * getBookings
   */
  public getBookings() {
    this.spinner.show();
    if(this.userId == ''  || this.userId == null){
      this.toastr.info('Login to get bookings!', 'Info!');
    }
    else {    
      this.userService.getBookings(this.userId).subscribe({
      next : (data: any) => {
       
        this.bookingList = data.response
        this.spinner.hide();
      }
      ,error :(error) => {
        //error handlin
        this.spinner.hide();
        this.toastr.error('Unable to fetch bookings!', 'Error!');
        console.log(error)
      }
    }); }

  }


  public cancelBookingEmittor(event: any) {
    this.spinner.show();
    this.getBookings()
  }


}
