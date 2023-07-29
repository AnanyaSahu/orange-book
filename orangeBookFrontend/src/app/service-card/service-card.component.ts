import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Business } from 'src/models/business.model';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { BusinessService } from 'src/services/business.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {

  constructor( private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private businessService: BusinessService,
    private toastr: ToastrService,
    public router: Router,
    private breadcrumbService : BreadcrumbService)
  {}

  @Input()
  public business: Business;
  @Input()
  public component: any;

  public getRatings(ratings:number): any{
    let list: any[]=  [];
    for(var i=1;i<=ratings;i++){
      list.push(i);

    }

    return list;

  }

  public navigateToDetailPage(businessId : string){
    this.router.navigate(['/service'], {queryParams :{ business:businessId}})


  }

  public bookAppointment( businessId : string) {

    let createBookingParam = {
      customerId: localStorage.getItem('userId'),
      serviceId: businessId

    }
    if(localStorage.getItem('userId') == '' || localStorage.getItem('userId') == null){
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
}
