import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {UserService} from '../../services/user.service'
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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


  constructor (private userService:UserService,
    private toastr: ToastrService,
    public router: Router) {

    // this.hashPassword('admin')
  }

  hashPassword(password: string): string {
    // console.log('hashPassword')
    const saltRounds = 10; // Number of salt rounds for hashing
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    // console.log(hash)
    return hash;
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
            this.toastr.success('Account created successfully!', 'Success!');
            this.router.navigate(['/home'])
            // do something with the data here
          }
          ,error :(error) => {
            //error handlin
            this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
            console.log(error)
          }
        }); 

    }

  }


  public login() {
    //hash password
    this.useremail = 'ananya@example.co'
    this.userpassword = '3627997f92de663756a57b5098e3c11e'
    let hashedPAssword = this.hashPassword(this.userpassword)
    this.userService.verifyUserAccount({username:this.useremail, password:this.userpassword}).subscribe({
      next : (data) => {
        this.userService.userDetails.next(data.response)
        this.userService.userDetailsAndToken.next(data)
        let ttl = 5 * 60* 1000 // in miliseconds
        const access_token_item = {
          access_token: data.access_token,
          expiry: new Date().getTime() + ttl,
        }
        localStorage.setItem('access_token',JSON.stringify(access_token_item))
        localStorage.setItem('userId',data.response.userId)
        console.log('service call response', data )
        this.toastr.success('Login successful!', 'Success!');
        this.router.navigate(['/home'])
        // do something with the data here
      }
      ,error :(error) => {
        //error handlin
        this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
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

