import { Component, OnInit } from '@angular/core';
import {BusinessService} from '../../services/business.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public locationList = new Array<string>();
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
    this.locationList = ['All','Dublin', 'Cork'];
  }

  public selectLocation(e: any){
    this.selectedLocation = e.target.value
    this.searchParams.location = e.target.value
  console.log(e.target.value)

  }

  public searchBusiness() {
    // this.searchParams = {
    //   business: this.businessInputField,
    //   location: string
    // }
    const business = this.searchParams.business!= '' ? this.searchParams.business : null;
    const location = this.searchParams.location!= '' ? this.searchParams.location : null;
    
    this.router.navigate(['/services'],{ queryParams: {business:business, location: location}})
//   this.businessService.getServices(this.searchParams).subscribe( {  

//     next : (data) => {
//       console.log('service call response', data )
//       this.router.navigate(['/services'+])
//       // do something with the data here 
//     }
//     ,error :(error) => {
//         //error handling
//          console.log(error)
//     }
// }); 
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
