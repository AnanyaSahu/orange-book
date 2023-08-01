import { Component, ViewChild } from '@angular/core';
import {UserService} from '../../services/user.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { BreadcrumbService } from 'src/services/breadcrumb.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { NgxSpinnerService } from 'ngx-spinner';

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
  public fbLoginOptions = { }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
  
  public config = [ ];
  @ViewChild('signInForm') signInForm: NgForm;
  @ViewChild('forgetPasswordForm') forgetPasswordForm: NgForm;
  @ViewChild('signupForm') createAccountForm: NgForm;

  constructor (private userService:UserService,
    private toastr: ToastrService,
    public router: Router,
    private authService: SocialAuthService,
    private breadcrumbService : BreadcrumbService,
    private spinner: NgxSpinnerService) {



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
    this.spinner.show();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((response : any) =>{
      
      let createAccountFBParam ={
        firstname:response.firstName,
        lastname:response.lastName, 
        password:'', 
        email:response.email, 
        phone:'', 
        address:'',
        isFacebookUser: true}
      this.userService.createUserAccount(createAccountFBParam).subscribe({
        next : (data: any) => {
          this.userService.accessTokenFBUser(createAccountFBParam.email).subscribe({
            next : (access: any) => {
      let ttl = 5 * 60* 1000 // in miliseconds
      const access_token_item = {
        access_token: access.access_token,
        expiry: new Date().getTime() + ttl,
      }
              this.userService.userDetails.next(data.response)
              this.userService.userDetailsAndToken.next(data)
              localStorage.setItem('userId',data.response.userId)
              localStorage.setItem('userName',data.response.firstName)
              localStorage.setItem('access_token',JSON.stringify(access_token_item))
              this.spinner.hide();
              this.toastr.success('Login successful!', 'Success!');
              this.router.navigate(['/home'])
            }
            ,error :(error) => {
              this.spinner.hide();
              this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
              console.log(error)
            }
          }); 

        }
        ,error :(error) => {
          this.spinner.hide();
          this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
          console.log(error)
        }
      }); 

    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  public createAccount(){

    this.spinner.show();
      let createAccountParam = {
        firstname:this.firstName,
        lastname:this.lastName, 
        password:this.password, 
        email:this.email, 
        phone:this.contactNumber, 
        address:this.address,
        isFacebookUser:false}
      
        this.userService.createUserAccount(createAccountParam).subscribe({
          next : (data: any) => {
            this.spinner.hide();
            if(data.message == 'Account already exist') {
              this.toastr.info('Please login or use a different email to create account', data.message);
            } else {
              this.createAccountForm.resetForm()
              this.toastr.success('Please Login!', 'Account created successfully!');
              
            }
            this.switchForm()
          }
          ,error :(error) => {
            this.spinner.hide();

            this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
            console.log(error)
          }
        }); 


  }


  public login() {
    this.spinner.show();
    if(this.useremail != null &&  this.userpassword != null) {
      this.userService.verifyUserAccount({username:this.useremail, password:this.userpassword }).subscribe({
        next : (data) => {
          this.spinner.hide();
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
            localStorage.setItem('userName',data.response.firstName)
            this.toastr.success('Login successful!', 'Success!');
            this.signInForm.resetForm()
            this.router.navigate(['/home'])
          }
         
        }
        ,error :(error) => {
          this.spinner.hide();
          this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
          console.log(error)
        }
      }); 
    }

  }

  public switchForm() {
    this.isSignUpFormVisible = !this.isSignUpFormVisible

  }

  public forgetPassword(){
    this.isForgetPasswordClicked = true;
  }

  
  public cancelResettingPassword(){
    this.isForgetPasswordClicked = false;
  }

  
  public resetPassword(){
    this.spinner.show();
    if(this.resetuseremail != null &&  this.newuserpassword != null) {
      this.userService.updateUserPassword(this.resetuseremail,{password:this.newuserpassword}).subscribe({
        next : (data: any) => {
          this.spinner.hide();
          if(data.message == 'User Not Found') {
            this.toastr.info('Please enter a valid user email!', 'User Not Found!');
          } else if(data.message =='Password has been updated'){
            this.toastr.success('Please login again with new passowrd!', 'Password Updated!');
            this.forgetPasswordForm.resetForm()
          }
          
          this.isSignUpFormVisible = false
          this.isForgetPasswordClicked = false
  
        }
        ,error :(error) => {
          this.spinner.hide();
          this.toastr.error('Somthing went wront. Please try again later!', 'ERROR!');
          console.log(error)
        }
      }); 
    }

  }

}   

