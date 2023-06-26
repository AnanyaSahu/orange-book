import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/modals/business.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-bookings',
  templateUrl: './account-bookings.component.html',
  styleUrls: ['./account-bookings.component.scss']
})
export class AccountBookingsComponent implements OnInit {


  public bookingList = new Array<any>();

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router) {

  }


  ngOnInit() {
    this.getBookings()

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
  }

}
