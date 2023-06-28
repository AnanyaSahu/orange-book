import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.model';

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

  constructor(){

  }

  ngOnInit(): void {
    this.user = {
      firstName:'edwsgf',
      userId : 'bfs',
      lastName:"sfgs", 
      email:'sgvd', 
      contactNumber:237548, 
      password:'sdkjyfh'
    }
  }

  showPassword(){
   this.isMaskedPasswordVisible = !this.isMaskedPasswordVisible
    this.password = this.isMaskedPasswordVisible? 'xxxxxxxx': this.user.password
    this.showHidelink = this.isMaskedPasswordVisible? 'Show': 'Hide'
  }

  editDetails(){
    this.isEditButtonClicked = !this.isEditButtonClicked
  }

  /**
   * saveDetails
   */
  public saveDetails() {
    //api call to save details
    this.editDetails()
  }

}
