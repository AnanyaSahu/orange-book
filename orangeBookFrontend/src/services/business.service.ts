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

  // private prefix = 'http://127.0.0.1:5000'
  private prefix = ''

  constructor(private http: HttpClient, private us: UserService,
    private auth: AuthService) { 
  }


  public getServices( params: any): Observable<Object> {
    return this.http
    .get(this.prefix + '/getServices/'+ params.business + '/'+ params.location,{responseType:'json'})
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

}
