import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { Router } from '@angular/router';

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
    public router: Router) {

  }


  ngOnInit() {
   this.getLocationList();
  }

  private getLocationList() {
    this.businessService.getLocations().subscribe((data: any)=>{
      this.locationList = ['All'];
      for (const key in data['response']) {
        this.locationList.push(data['response'][key][0])
      }
    })
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
