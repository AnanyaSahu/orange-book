import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {UserService} from '../../services/user.service'
import * as bcrypt from 'bcryptjs';

// const bcrypt = require('bcryptjs')
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
 
  public firstName: string;
  public lastName: string;
  public email: string;
  public contactNumber: number;
  public password: string;
  public repeatpassword: string;
  public useremail: string;
  public userpassword: string;
  public address:string;
  public isSignUpFormVisible = false
  // passwordHash = require('password-hash');


  constructor (private userService:UserService) {
    this.hashPassword('admin')
  }

  hashPassword(password: string): string {
    console.log('hashPassword')
    const saltRounds = 10; // Number of salt rounds for hashing
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash)
    return hash;
  }
  
  
  // Show toast notification
  public showToast(message: string) {
    // let toast = await this.toastCtrl.create({
    //   message: message,
    //   duration: 2000,
    //   position: 'middle'
    // });
    // toast.present();
  }

  public createAccount(){
    if(this.password.trim() != this.repeatpassword.trim()){
      // erroe msg 
    } else{
      console.log('createAccount method')


      let createAccountParam = {
        firstname:this.firstName,
        lastname:this.lastName, 
        password:this.password, 
        email:this.email, 
        phone:this.contactNumber, 
        address:this.address}
      
        this.userService.createUserAccount(createAccountParam).subscribe({
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

  }


  public login() {
    //hash password
    this.userService.verifyUserAccount({username:this.useremail, password:this.userpassword}).subscribe({
      next : (data) => {
        this.userService.userDetails.next(data)
        console.log('service call response', data )
        // do something with the data here
      }
      ,error :(error) => {
        //error handlin
        console.log(error)
      }
    }); 
  }

  public switchForm() {
    this.isSignUpFormVisible = !this.isSignUpFormVisible

  }

  public forgetPassword(){
    
  }

}
// function md5(arg0: string) {
//   throw new Error('Function not implemented.');
// }

