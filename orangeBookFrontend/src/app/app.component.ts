import {  SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from 'src/services/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'orangeBookFrontend';
  public isAccountModalOpen = false;
  public tabName = ''
  public currentRoute = ''
  public breadCrumbList = []
  // @ViewChild('accountModal', { static: false }) 
  // accountModalElementRef: ElementRef;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private breadcrumbService : BreadcrumbService,
    private authService: SocialAuthService
  ) {
    this.currentRoute = window.location.href;  
    if(this.currentRoute.indexOf('home')>1){
      this.tabName = 'home'
    } else     if(this.currentRoute.indexOf('services')>1){
      this.tabName = 'services'
    } 
  }
  ngOnInit(): void {
    this.breadcrumbService.breadCrumb.subscribe((breadcrumb: any) =>{
      console.log('breadcrumb app compoment')
      console.log(breadcrumb)
      this.breadCrumbList = breadcrumb
    })
  }




  public navigateToTab(tabName : string): void {
    this.tabName = tabName
    this.router.navigate(['/'+tabName])
  }
  /**
   * toggleAccountModal
   */
  public toggleAccountModal(e:any) {
    this.tabName = ''
    this.isAccountModalOpen= !this.isAccountModalOpen
    
  }

  close(event:any){
    // console.log('clodes')
    this.toggleAccountModal(event)
    // event.stopPropagation()
  }

}
