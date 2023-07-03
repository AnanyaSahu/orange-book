import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { BreadcrumbService } from 'src/services/breadcrumb.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {

  constructor(public router: Router,
    private breadcrumbService : BreadcrumbService) {

      this.breadcrumbService.breadCrumb.next([{url: '', label: ''}])

  }

  /**
   * navigateToHomePage
   */
  public navigateToHomePage() {
    this.router.navigate(['/home'])

  }
}
