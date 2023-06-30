import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private toastr: ToastrService) { }

  
  //this code is taken from https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
  public getAccessToken(): any{
    const access_token_item = localStorage.getItem('access_token');
    if (!access_token_item) {
      this.toastr.info( 'Please Login Again!','Session Expired!');
      return null
    }
    const item = JSON.parse(access_token_item)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem('access_token')
      return null
    }
    return item.access_token
  }
}
