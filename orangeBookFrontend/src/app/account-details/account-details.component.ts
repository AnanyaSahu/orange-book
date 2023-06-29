import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit{

  public user: User;
  public password = 'xxxxxxxx'
  public showHidelink = 'Show'
  public isMaskedPasswordVisible = true;
  public isEditButtonClicked = false

  constructor (private userService:UserService) {

  }

  ngOnInit(): void {
    this.getUserDetailsFromUserService()
    this.getDEtailsformDB()
  }
  /**
   * getUserDetailsFromUserService
   */
  public getUserDetailsFromUserService() {
    this.userService.userDetails.subscribe((userData)=>{
      this.user = userData

    })
  }

  getDEtailsformDB(){
    this.userService.getAccountDetails(100).subscribe({
      next : (data) => {
        // this.userService.userDetails.next(data)
        console.log('service call response', data )
        // do something with the data here
      }
      ,error :(error) => {
        //error handlin
        console.log(error)
      }
    }); 
  }

  showPassword(){
   this.isMaskedPasswordVisible = !this.isMaskedPasswordVisible
    this.password = this.isMaskedPasswordVisible? 'xxxxxxxx': this.user.password
    this.showHidelink = this.isMaskedPasswordVisible? 'Show': 'Hide'
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


 
  }


  public updateUserAccount(){
 
      console.log('updateUserAccount method')
    

      let updateUserAccountParam = {
        firstname:this.user.firstName,
        lastname:this.user.lastName, 
        password:this.user.password, 
        email:this.user.email, 
        phone:this.user.contactNumber, 
        address:this.user.address}
      
        this.userService.updateUserAccount(Number(this.user.userId),updateUserAccountParam).subscribe({
          next : (data) => {
            console.log('service call response', data )
            // do something with the data here
          } 
          ,error :(error) => {
            //error handlin
            console.log(error)
          }
        }); 

    
  }

  // public G

}
