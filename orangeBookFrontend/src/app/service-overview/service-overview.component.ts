import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { ActivatedRoute } from '@angular/router';
import { Business } from 'src/models/business.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/services/breadcrumb.service';

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
    private toastr: ToastrService,
    private breadcrumbService : BreadcrumbService) {

      this.breadcrumbService.breadCrumb.next([{url: '/services', label: 'Services'}])

  }


  ngOnInit() {
    this.searchBusiness()
  }



  private searchBusiness() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      console.log(queryParams)
      this.searchParams.business = queryParams['business']?queryParams['business']:"all";
      this.searchParams.location = queryParams['location']?queryParams['location']:"all";

      this.businessService.getServices( this.searchParams).subscribe( {  
        next : (data: any) => {
          this.businessList = data.response
          if ( this.searchParams.business?.trim() =='all' && this.searchParams.location.trim()=='all') {
            this.searchedResultsString = this.businessList.length + " results found";
          }
          else if( this.searchParams.business.trim()!='all' &&  this.searchParams.location.trim()!='all') {
            this.searchedResultsString = this.businessList.length + " results for " + this.searchParams.business +" found near "+ this.searchParams.location;
          } else if ( this.searchParams.business?.trim() !='all' && this.searchParams.location.trim()=='all') {
            this.searchedResultsString = this.businessList.length + " results for " + this.searchParams.business +" found";
          }
          else if ( this.searchParams.business?.trim() =='all' && this.searchParams.location.trim()!='all'){
            this.searchedResultsString = this.businessList.length + " results for " + this.searchParams.location +" found";
          } 
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
