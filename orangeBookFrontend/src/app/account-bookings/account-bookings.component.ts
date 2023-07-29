import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/models/business.model';
import { Router } from '@angular/router';
import {BusinessService} from '../../services/business.service'
import {UserService} from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/services/breadcrumb.service';


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
    private businessService:BusinessService,
    private userService:UserService,
    private toastr: ToastrService,
    private breadcrumbService : BreadcrumbService) {

      this.breadcrumbService.breadCrumb.next([{url: '/bookings', label: 'My Bookings'}])
    
  }


  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    // this.userService.userDetails.subscribe((userData)=>{
    //   this.userId = userData.userId
      this.getBookings()
    // })
   

  }



  /**
   * getBookings
   */
  public getBookings() {
    if(this.userId == ''  || this.userId == null){
      this.toastr.info('Login to get bookings!', 'Info!');
    }
    else {    
      this.userService.getBookings(this.userId).subscribe({
      next : (data: any) => {
       
        this.bookingList = data.response
        console.log('service call response', data )
        // do something with the data here

      }
      ,error :(error) => {
        //error handlin
        this.toastr.error('Unable to fetch bookings!', 'Error!');
        console.log(error)
      }
    }); }

  }


   /**
   * getBookings
   */
   public cancelBooking(bookingId: number) {

    this.businessService.cancelBookings(bookingId).subscribe({
      next : (data) => {
        console.log('service call response', data )
        // do something with the data here
        this.getBookings()
        this.toastr.success('Your booking has been cancelled!', 'Success!');
      }
      ,error :(error) => {
        //error handlin
        this.toastr.error('Unable to cancel bookings!', 'Error!');
        console.log(error)
      }
    }); 
  }


}
