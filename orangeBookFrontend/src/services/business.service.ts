import { Injectable } from '@angular/core';
import { throwError, of,  Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';
import { catchError, retry } from 'rxjs/operators';
// import 'rxjs/add/operator/catch';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private prefix = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { 

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
    return this.http
    .get(this.prefix + '/getLocations')
  }
  
  public createBookings( params: any): Observable<Object> {
    return this.http
    .post(this.prefix + '/createBookings', params)


  }

  
  public cancelBookings(bookingId: number): Observable<Object> {
    return this.http
    .put(this.prefix + '/cancelBookings/' + bookingId, {isCancelled: true})

  }


  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }

}
