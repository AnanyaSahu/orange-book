import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/models/business.model';
import { Router } from '@angular/router';
import {BusinessService} from '../../services/business.service'
import {UserService} from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';


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
    private toastr: ToastrService
    ) {

  }


  ngOnInit() {
    this.userService.userDetails.subscribe((userData)=>{
      this.userId = userData.userId
      this.getBookings()
    })
   

  }



  /**
   * getBookings
   */
  public getBookings() {
    this.bookingList = [ {     businessId: '101',
    businessName: 'plumber',
    contactNumber: 'string',
    email: 'string',
    address: 'string',
    ratings: 3,
    sreviceType: 'string',
    serviceCost: 'string'}]

    this.userService.getBookings(100).subscribe({
      next : (data) => {
       
        console.log('service call response', data )
        // do something with the data here

      }
      ,error :(error) => {
        //error handlin
        this.toastr.error('Unable to fetch bookings!', 'Error!');
        console.log(error)
      }
    }); 
  }


   /**
   * getBookings
   */
   public cancelBooking(bookingId: number) {

    this.businessService.cancelBookings(bookingId).subscribe({
      next : (data) => {
        console.log('service call response', data )
        // do something with the data here
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
