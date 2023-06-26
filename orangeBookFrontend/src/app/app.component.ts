import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orangeBookFrontend';
  public isAccountModalOpen = false;
  @ViewChild('accountModal', { static: false }) 
  accountModalElementRef: ElementRef;

  constructor(
    public router: Router
  ) {
    
  }


  public navigateToTab(tabName : string): void {
    this.router.navigate(['/'+tabName])
  }
  /**
   * toggleAccountModal
   */
  public toggleAccountModal(e:any) {
    this.isAccountModalOpen= !this.isAccountModalOpen
    
  }

  // @HostListener('document:click', ['$event'])
  // logGlobalEvent(globalEvent: any): void{
  //   console.log(this.isAccountModalOpen)
  //   if(this.isAccountModalOpen){
  //     if(this.isEventTriggeredInsideHost(globalEvent)){
  //       console.log('isEventTriggeredInsideHost')
  //       return
  //     }
  //     console.log(' console.log')
  //     this.isAccountModalOpen = false;
  //   }
  // }


  // isEventTriggeredInsideHost(event: any) : boolean {
  //   console.log(event)
  //   console.log(this.accountModalElementRef.nativeElement)
  //   let current = event.target
  //   let host = this.accountModalElementRef.nativeElement;
  //   do{
  //     if(current=== host){
  //       return (true)
  //     }
  //     current =current.parentNode
  //   } while(current)
  //   return (false)
  // }
}
