import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountBookingsComponent } from './account-bookings/account-bookings.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceOverviewComponent } from './service-overview/service-overview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServiceOverviewComponent },
  { path: 'service', component: ServiceDetailsComponent },
  { path: 'login', component: LoginSignupComponent },
  { path: 'bookings', component: AccountBookingsComponent },
  { path: 'userDetails', component: AccountDetailsComponent },
  

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '404', component: ErrorPageComponent
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }