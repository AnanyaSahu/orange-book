import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Business } from 'src/models/business.model';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
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
    private businessService: BusinessService,
    private toastr: ToastrService,
    public router: Router,
    private breadcrumbService : BreadcrumbService) {

      this.breadcrumbService.breadCrumb.next([{url: '/service', label: 'Service'}])

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
      // console.log("userId")
      // console.log(userData)

    })
  }
  getBusinessById(){
  
      this.activatedRoute.queryParams.subscribe(queryParams => {
 
        this.bookingId = queryParams['business']
        this.businessService.getServiceByServiceId(this.bookingId).subscribe( {  
          next : (data: any) => {
            console.log('service call response', data )
            if(data.message == 'No Matching Business')
            {
              this.toastr.info('No Matching Business!', 'Info!');
              this.router.navigate(['/services'])
            } else{
              this.business = data.response[0]
          
            }
            
          }
          ,error :(error: any) => {
              //error handling
              if(error.status == 404){
                this.router.navigate(['/404'])

              } 
              this.toastr.error('Unable to fetch service!', 'ERROR!');
               console.log(error)
          }
      });
      })
      
  
    }
   public bookAppointment( businessId : string) {
    
          let createBookingParam = {
            customerId: this.userId,
            serviceId: businessId

          }

          if(this.userId == ''){
            this.toastr.info('Login to book appointment!', 'Info!');
          }
          else {
            this.businessService.createBookings(createBookingParam).subscribe( {  
  
              next : (data) => {
                this.toastr.success('Booking Confirmed!', 'Success!');
              }
              ,error :(error) => {
                  //error handling
                  this.toastr.error('Somthing went wrong, not able to book appointment!', 'ERROR!');
                   console.log(error)
              }
          });
          }

   }

   private getUserLoginDetails() {
    this.userService.isUserLoggedIn.subscribe(value => this.isUserLoggedIn = value)
   }
}
