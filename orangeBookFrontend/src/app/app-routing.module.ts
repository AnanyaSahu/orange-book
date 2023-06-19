import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceOverviewComponent } from './service-overview/service-overview.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServiceOverviewComponent },
  { path: 'service', component: ServiceDetailsComponent },
  { path: 'login', component: LoginSignupComponent },
  

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }






// @NgModule({
//   imports: [RouterModule.forChild(routes)],
// })
// export class TabsPageRoutingModule {}