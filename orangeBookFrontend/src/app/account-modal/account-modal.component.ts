import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent {

  @Output() 
  public closeModalEmittor = new EventEmitter();
  public isUserLoggedIn = false

  constructor(public router: Router){
    console.log(localStorage.getItem('userId'))
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
    console.log('login button')
    this.closeAccountModal()
    this.router.navigate(['/'+pageName])
    
  }

  /**
   * closeAccountModal
   */
  public closeAccountModal() {
    this.closeModalEmittor.emit(null);
  }

  // close(event:any){
  //   console.log('colse modal')
  //   // this.toggleAccountModal(event)
  //   event.stopPropagation()
  // }

  signout(){
    this.closeAccountModal()
    localStorage.removeItem('access_token')
    localStorage.removeItem('userId')
    // localStorage.setItem('userId')=null 
    this.router.navigate(['/home'])
  }
}
