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

  public getServices(searchParams: any): Observable<Object> {
    console.log(searchParams)
    return this.http
    .get(this.prefix + '/getBookings/101')

    // return of('in service')
  }


  // private static _handleError(err: HttpErrorResponse | any) {
  //   return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }

  // GET list of public, future events
  getExams(): Observable<any> {
    return this.http
      .get(this.prefix + '/getBookings/101')


        // return this.http
    //   .get(`${API_URL}/exams`)
    //   .catch(BusinessService._handleError);
  }
}
