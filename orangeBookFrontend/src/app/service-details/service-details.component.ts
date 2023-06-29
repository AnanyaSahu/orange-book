import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/models/business.model';
import { BusinessService } from 'src/services/business.service';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {

  public business: Business;
  public isUserLoggedIn: boolean = false;
  public userId: any
  public bookingId: any;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private businessService: BusinessService
    ) {

  }


  ngOnInit() {
    this.getUserDetailsFromUserService()
    this.getBusinessById()
  }


  /**
   * getUserDetailsFromUserService
   */
  public getUserDetailsFromUserService() {
    this.userService.userDetails.subscribe((userData)=>{
      this.userId = userData.userId

    })
  }
  getBusinessById(){
  
      this.activatedRoute.queryParams.subscribe(queryParams => {
        console.log(queryParams)
        this.bookingId = queryParams['businessId']
        this.business = 
          {     
            businessId: '101',
            businessName: 'plumber',
            contactNumber: 'string',
            email: 'string',
            address: 'string',
            ratings: 3,
            sreviceType: 'string',
            serviceCost: 'string'
          }

        this.businessService.getServiceByServiceId(this.bookingId).subscribe( {  
  
          next : (data) => {
            console.log('service call response', data )
            // do something with the data here 
          }
          ,error :(error) => {
              //error handling
               console.log(error)
          }
      });
      })
      
  
    }
   public bookAppointment( businessId : string) {
    console.log('sdhblkuj')
          let createBookingParam = {
            customerId: this.userId,
            serviceId: this.bookingId

          }
    this.businessService.createBookings(createBookingParam).subscribe( {  
  
      next : (data) => {
        console.log('service call response', data )
        // do something with the data here 
      }
      ,error :(error) => {
          //error handling
           console.log(error)
      }
  });
    
    //show toast for bookings

   }

   private getUserLoginDetails() {
    this.userService.isUserLoggedIn.subscribe(value => this.isUserLoggedIn = value)
   }
}
