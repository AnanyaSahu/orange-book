import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/models/business.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-service-overview',
  templateUrl: './service-overview.component.html',
  styleUrls: ['./service-overview.component.scss']
})
export class ServiceOverviewComponent implements OnInit {

  public searchParams: {
    business: string,
    location: string
  } = { business: '',
        location: ''}

  public searchedResultsString = ""
  public businessList = new Array<Business>();

  constructor(private businessService: BusinessService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService) {

  }


  ngOnInit() {
    this.searchBusiness()
  }



  private searchBusiness() {
    console.log('searchBusiness inoverview')
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams)
      this.searchParams.business = queryParams['business']? queryParams['business']:"all";
      this.searchParams.location = queryParams['location']?queryParams['location']:"all";
     
      // this.businessList = [
      //   {     businessId: '101',
      //     businessName: 'plumber',
      //     contactNumber: '83274523857023',
      //     email: 'string@gmail.com',
      //     address: '34, address, sddress',
      //     ratings: 3,
      //     sreviceType: 'type  of service',
      //     serviceCost: 's$54656',
      //     location: 'dublin'},
      //     {     businessId: '101',
      //     businessName: 'plumber',
      //     contactNumber: 'string',
      //     email: 'string',
      //     address: 'string',
      //     ratings: 3,
      //     sreviceType: 'string',
      //     serviceCost: 'string',
      //     location: 'dublin'}
      // ];

      this.businessService.getServices( this.searchParams).subscribe( {  
        next : (data: any) => {
          this.businessList = data.response
          console.log('service call response', data )
          if ( this.searchParams.business?.trim() =='all' && this.searchParams.location.trim()=='all') {
            this.searchedResultsString = this.businessList.length + " results found";
          }
          else if( this.searchParams.business.trim()!='all' &&  this.searchParams.location.trim()!='all') {
            this.searchedResultsString = this.businessList.length + " results for " + this.searchParams.business +" found near "+ this.searchParams.location;
          } else if ( this.searchParams.business?.trim() !='all' && this.searchParams.location.trim()=='all') {
            this.searchedResultsString = this.businessList.length + " results for " + this.searchParams.business +" found";
    
          }
         
          // do something with the data here  
        }
        ,error :(error) => {
            //error handling
            this.toastr.error('Unable to fetch services!', 'ERROR!');
             console.log(error)
        }
    });
    })
    

  }

  public navigateToDetailPage(businessId : string){
    this.router.navigate(['/service'], {queryParams :{ business:businessId}})


  }
  public getRatings(ratings:number): any{
    let list: any[]=  [];
    for(var i=1;i<=ratings;i++){
      list.push(i);

    }

    return list;

  }
}
