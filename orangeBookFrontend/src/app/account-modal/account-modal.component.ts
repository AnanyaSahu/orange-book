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

  constructor(public router: Router){

  }

  /**
   * navigateToLoginPage
   */
  public navigateToPage(pageName: string) {
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
    this.router.navigate(['/home'])
  }
}
