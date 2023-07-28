import { Component } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {UserService} from '../../services/user.service'
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { SocialAuthService } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";

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
  public fbLoginOptions = { }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
  
  public config = [ ];

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

    const fbLoginOptions = {
      scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
      return_scopes: true,
      enable_profile_selector: true
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    
    const config = [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("Facebook-App-Id", this.fbLoginOptions)
      },
  
    ];
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
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
        console.log(data.message)
        if(data.message == 'Invalid Credentials'){
          this.toastr.error('Please enter a correct username or password!', 'ERROR!');
        } else if(data.message == 'User Not Found') {
          this.toastr.error('Please enter a valid username!', 'ERROR!');
        } else {
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
        }
       
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

}   

