import { Injectable } from '@angular/core';
import { throwError, of,  Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { HttpClient ,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private prefix = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient, private us: UserService,
    private auth: AuthService) { 

    // this.us.userDetailsAndToken.subscribe(data =>{
    //   console.log(data)
    // })
  }


  public getServices( params: any): Observable<Object> {
    console.log('business service', params)
    return this.http
    .get(this.prefix + '/getServices/'+ params.business + '/'+ params.location)
  }

  public getServiceByServiceId( params: any): Observable<Object> {
    return this.http
    .get(this.prefix + '/getService/'+params)
  }

  
  public getLocations(): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .get(this.prefix + '/getLocations',{ headers })
  }
  
  public createBookings( params: any): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .post(this.prefix + '/createBookings', params,{ headers })


  }

  
  public cancelBookings(bookingId: number): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .put(this.prefix + '/cancelBookings/' + bookingId, {isCancelled: true}, { headers })

  }


  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }

  // //this code is taken from https://www.sohamkamani.com/javascript/localstorage-with-ttl-expiry/
  // public getAccessToken(): any{
  //   console.log(localStorage.getItem('access_token'))
  //   const access_token_item = localStorage.getItem('access_token');
  //   if (!access_token_item) {
  //     return null
  //     //toast token expired plz login again
  //   }
  //   const item = JSON.parse(access_token_item)
  //   const now = new Date()
  //   if (now.getTime() > item.expiry) {
  //     // If the item is expired, delete the item from storage
  //     // and return null
  //     localStorage.removeItem('access_token')
  //     return null
  //       //toast token expired plz login again
  //   }
  //   return item.access_token
  // }

}
