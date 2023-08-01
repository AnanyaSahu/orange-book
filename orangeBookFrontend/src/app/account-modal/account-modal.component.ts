import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent {

  @Output() 
  public closeModalEmittor = new EventEmitter();
  public isUserLoggedIn = false
  public userName: any = ''

  constructor(public router: Router, private toastr: ToastrService){

    if(localStorage.getItem('userId')!=null || localStorage.getItem('userId')!=undefined ){
      this.isUserLoggedIn = true

    } else {
      this.isUserLoggedIn = false
    }
    
  }

  /**
   * navigateToLoginPage
   */
  public navigateToPage(pageName: string) {
    this.closeAccountModal()
    if(localStorage.getItem('userId') == null && (pageName == 'userDetails' || pageName == 'bookings'))
    {
      this.toastr.info( 'Please Login to view details!','');
      this.router.navigate(['/login'])
    } else {
     
      this.router.navigate(['/'+pageName])
    }

    
  }

  /**
   * closeAccountModal
   */
  public closeAccountModal() {
    this.closeModalEmittor.emit(null);
  }

  signout(){
    this.closeAccountModal()
    localStorage.removeItem('access_token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    this.router.navigate(['/home'])
  }

  getUserName(){
    return localStorage.getItem('userName') != null?  localStorage.getItem('userName'): ' '
  }
}
