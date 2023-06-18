import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/modals/business.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss']
})
export class ServiceOverviewComponent implements OnInit {

  // private searchParams: {
  //   business: string,
  //   location: string
  // } = { business: '',
  //       location: ''}

  public businessList = new Array<Business>();

  constructor(private businessService: BusinessService,
    private activatedRoute: ActivatedRoute,
    public router: Router) {

  }


  ngOnInit() {
    this.searchBusiness()
  }



  private searchBusiness() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams)
      this.businessList = [
        {     businessId: '101',
          businessName: 'plumber',
          contachNumber: 'string',
          email: 'string',
          address: 'string',
          ratings: 3,
          sreviceType: 'string',
          serviceCost: 'string'},
          {     businessId: '101',
          businessName: 'plumber',
          contachNumber: 'string',
          email: 'string',
          address: 'string',
          ratings: 3,
          sreviceType: 'string',
          serviceCost: 'string'}
      ]
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

  public navigateToDetailPage(businessId : string){
    this.router.navigate(['/service'], {queryParams :{ business:businessId}})


  }
}
