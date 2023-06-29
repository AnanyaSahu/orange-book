import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  //this code is taken from https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
  public getAccessToken(): any{
    console.log(localStorage.getItem('access_token'))
    const access_token_item = localStorage.getItem('access_token');
    if (!access_token_item) {
      return null
      //toast token expired plz login again
    }
    const item = JSON.parse(access_token_item)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem('access_token')
      return null
        //toast token expired plz login again
    }
    return item.access_token
  }
}
