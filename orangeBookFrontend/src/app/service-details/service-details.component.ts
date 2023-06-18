import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/modals/business.model';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent {

  public business: Business;
  public isUserLoggedIn: boolean = false;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
    ) {

  }


  ngOnInit() {
    this.getBusinessById()
  }



  getBusinessById(){
  
      this.activatedRoute.queryParams.subscribe(queryParams => {
        console.log(queryParams)
        this.business = 
          {     
            businessId: '101',
            businessName: 'plumber',
            contachNumber: 'string',
            email: 'string',
            address: 'string',
            ratings: 3,
            sreviceType: 'string',
            serviceCost: 'string'
          }
      //   this.businessService.getServices(queryParams).subscribe( {  
  
      //     next : (data) => {
      //       console.log('service call response', data )
      //       // do something with the data here 
      //     }
      //     ,error :(error) => {
      //         //error handling
      //          console.log(error)
      //     }
      // });
      })
      
  
    }
   public bookAppointment( businessId : string) {
    console.log('sdhblkuj')
    
    //show toast for bookings

   }

   private getUserLoginDetails() {
    this.userService.isUserLoggedIn.subscribe(value => this.isUserLoggedIn = value)
   }
}
