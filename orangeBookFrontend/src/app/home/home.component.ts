import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreadcrumbService } from 'src/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public locationList = new Array<any>();
  public selectedLocation : string = 'All';
  public businessInputField: string = ''
  private searchParams: {
    business: string,
    location: string
  } = { business: '',
        location: ''}
  constructor(private businessService: BusinessService,
    private toastr: ToastrService,
    public router: Router,
    private breadcrumbService : BreadcrumbService) {

      this.breadcrumbService.breadCrumb.next([{url: '', label: ''}])
    }




  ngOnInit() {
   this.getLocationList();
  }

  private getLocationList() {
    this.businessService.getLocations().subscribe({
      next : (data: any) => {
        this.locationList = ['All'];
        for (const key in data['response']) {
          this.locationList.push(data['response'][key][0])
        }
      }
      ,error :(error) => {
        this.toastr.error('Unable to fetch Locations!', 'ERROR!');
        console.log(error)
      }
    }); 
  }

  public selectLocation(e: any){
    this.selectedLocation = e.target.value
    this.searchParams.location = e.target.value
  console.log(e.target.value)

  }

  public searchBusiness() {

    const business = this.searchParams.business!= '' ? this.searchParams.business : null;
    const location = this.searchParams.location!= '' ? this.searchParams.location : null;
    
    this.router.navigate(['/services'],{ queryParams: {business:business, location: location}})
  }

  public onKeyUp(e: any){
    if(e.target.value.length >= 3) {
        this.businessInputField = e.target.value
        this.searchParams.business = e.target.value
        console.log(e.target.value)
    } else {
      this.businessInputField = ''
    }
  }

}
