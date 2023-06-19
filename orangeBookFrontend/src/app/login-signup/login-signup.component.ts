import { Component } from '@angular/core';

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
  public isSignUpFormVisible = false

  constructor () {

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

    // create account api call

    // show toast
  }


  public login() {
    
  }

  public switchForm() {
    this.isSignUpFormVisible = !this.isSignUpFormVisible

  }

}
