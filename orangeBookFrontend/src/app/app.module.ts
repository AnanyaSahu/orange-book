import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ServiceOverviewComponent } from './service-overview/service-overview.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { AccountModalComponent } from './account-modal/account-modal.component';
import { AccountBookingsComponent } from './account-bookings/account-bookings.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServiceOverviewComponent,
    ServiceDetailsComponent,
    LoginSignupComponent,
    AccountModalComponent,
    AccountBookingsComponent,
    AccountDetailsComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
