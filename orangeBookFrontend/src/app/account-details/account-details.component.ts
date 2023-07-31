import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/user.model';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit{

  public user: User ={
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    contactNumber: '',
    isFacebookUser: false
  };
  private userCopy : any
  public userId: any;
  public password = 'xxxxxxxx'
  public showHidelink = 'Show'
  public isMaskedPasswordVisible = true;
  public isEditButtonClicked = false


  constructor (private userService:UserService,
    private toastr: ToastrService,
     private breadcrumbService : BreadcrumbService,
     private spinner: NgxSpinnerService) {

      this.breadcrumbService.breadCrumb.next([{url: '/userDetails', label: 'My Account'}])
    

  }

  ngOnInit(): void {
    // this.getUserDetailsFromUserService()
    this.getDEtailsformDB()
  }
  /**
   * getUserDetailsFromUserService
   */
  public getUserDetailsFromUserService() {
    // this.userService.userDetails.subscribe((userData)=>{
      

    // })
  }

  getDEtailsformDB(){
    this.spinner.show();
    this.userId = localStorage.getItem('userId')? localStorage.getItem('userId'): null
    if( this.userId != null) {
      this.userService.getAccountDetails(this.userId).subscribe({
        next : (data: any) => {
          // this.userService.userDetails.next(data)
          // console.log(data)
          this.user = data.response
          this.userCopy = JSON.parse(JSON.stringify(this.user))
          // console.log('service call response', this.user )
          // do something with the data here
        }
        ,error :(error) => {
          //error handlin
          this.toastr.error('Unable to fetch details!', 'ERROR!');
          console.log(error)
        }
      }); 
    } else {
      this.toastr.info( 'Please Login Again!','Session Expired!');
    }
 
  }


  switchForms(){
    this.isEditButtonClicked = !this.isEditButtonClicked
  }

  editDetails(){
    this.isEditButtonClicked = !this.isEditButtonClicked
  }

  /**
   * saveDetails
   */
  public saveDetails() {
    
    this.editDetails()
    //api call to save details

    this.updateUserAccount()


 
  }


  public updateUserAccount(){
    this.spinner.show();
      let updateUserAccountParam = {
        firstname:this.user.firstName,
        lastname:this.user.lastName, 
        password:this.user.password, 
        email:this.user.email, 
        phone:this.user.contactNumber, 
        address:this.user.address}
      
        this.userService.updateUserAccount(Number(this.user.userId),updateUserAccountParam).subscribe({
          next : (data) => {
            this.spinner.hide();
            this.toastr.success('Account Details Updated!', 'Success!');
            
          } 
          ,error :(error) => {
            //error handlin
            this.spinner.hide();
            this.toastr.error('Somthing went wrong!', 'ERROR!');
            console.log(error)
          }
        }); 

    
  }


  public cancelChanges(){
    
 this.editDetails()
// this.getDEtailsformDB()
this.user = this.userCopy
  }
}
