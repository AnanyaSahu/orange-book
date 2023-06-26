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

// //   $(".menuWraper").click(function(event) {
// //     alert('clicked inside');
// //     event.stopPropagation();
// // });

// $(document).on('click', (event: any) => { 
//   console.log(event); 
// });

  // $(document).on("click", function (event) {
  //   // If the target is not the container or a child of the container, then process
  //   // the click event for outside of the container.
  //   if ($(event.target).closest("#container").length === 0) {
  //     console.log("You clicked outside of the container element");
  //   }
  // });


  // document.addEventListener('click', function(event) {
  //   const outsideClick = !elem.contains(event.target);
  // });


}
