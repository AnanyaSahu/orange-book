import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orangeBookFrontend';

  constructor(
    public router: Router
  ) {

  }


  public navigateToTab(tabName : string): void {
    this.router.navigate(['/'+tabName])
  }
}
