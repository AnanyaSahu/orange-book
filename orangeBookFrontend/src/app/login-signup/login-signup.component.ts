import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {UserService} from '../../services/user.service'
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  public signupForm: FormGroup;
  public isForgetPasswordClicked = false;
  public newuserpassword= ''
  public resetuseremail = ''
  // passwordHash = require('password-hash');


  constructor (private userService:UserService,
    private toastr: ToastrService,
    public router: Router,
    private authService: SocialAuthService,
    private breadcrumbService : BreadcrumbService) {

    this.breadcrumbService.breadCrumb.next([{url: '/login', label: 'Login'}])
    this.signupForm = new FormGroup({
      title: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [Validators.pattern('[0-9]{10}')]),
      address: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatpassword: new FormControl('', Validators.required)
    });
  }

  // hashPassword(password: string): string {x`
  //   // console.log('hashPassword')
  //   const saltRounds = 10; // Number of salt rounds for hashing
  //   let h =''
  //   const salt = bcrypt.genSaltSync(saltRounds);
  //   const hash = bcrypt.hash(password, 10).then((data)=>{
  //     h =data
  //     console.log(data)
  //   });
  //   console.log(hash)
  //   return h;
  // }
  

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
    // this.useremail = 'ananya@example.co'
    // this.userpassword = '3627997f92de663756a57b5098e3c11e'
    let hashedPAssword = this.userpassword
    this.userService.verifyUserAccount({username:this.useremail, password:this.userpassword }).subscribe({
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
    this.isForgetPasswordClicked = true;
  }

  
  // 
  public resetPassword(){
    // api call to reset password  updateUserPassword
    this.userService.updateUserPassword(this.resetuseremail,{password:this.newuserpassword}).subscribe({
      next : (data: any) => {
        console.log('service call response', data )
        if(data.message == 'User Not Found') {
          this.toastr.info('Please enter a valid user email!', 'User Not Found!');
        } else if(data.message =='Password has been updated')
        this.toastr.success('Please login again with new passowrd!', 'Password Updated!');
        this.router.navigate(['/login'])
        // do something with the data here
      }
      ,error :(error) => {
        //error handlin
        this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
        console.log(error)
      }
    }); 
  }


  signInWithGoogle(): void {
    
    console.log('in signInWithGoogle')
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID,
      {headers:{ key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups', }})
      .then((user: SocialUser) => {
        // Handle the signed-in user information
        console.log('sigin via googel user')
        console.log(user);
      })
      .catch((error: any) => {
        // Handle error scenarios
        console.log('in methor error')
        console.log(error);
      });
  }

}   

