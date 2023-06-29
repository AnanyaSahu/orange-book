import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public isUserLoggedIn =  new BehaviorSubject(false);
  public userDetails =  new BehaviorSubject<User>({
    userId:'',
    firstName:'',
    lastName:'', 
    email:'', 
    contactNumber:'', 
    password:'',
    address:''
  });

  private prefix = 'http://127.0.0.1:5000'

  constructor(private http: HttpClient) { 

  }



  public createUserAccount(params: any): Observable<Object> {
    console.log(params)
    return this.http
    .post(this.prefix + '/createAccount', params)

    // return of('in service')
  }

  public verifyUserAccount(params: any): Observable<any> {
    console.log(params)
    //param['username'] +"' AND  [password] = '"+param['password']
    return this.http
    .post(this.prefix + '/verifyAccount', params)

    // return of('in service')
  }

  
  public updateUserAccount(userId: number, params: any): Observable<Object> {
    console.log(params)
    return this.http
    .put(this.prefix + '/createAccount/' + userId, params)

    // return of('in service')
  }

  
  public getAccountDetails(userId: number): Observable<Object> {
    return this.http
    .get(this.prefix + '/getAccountDetails/' + userId)

    // return of('in service')
  }
  
  public getBookings(userId: number): Observable<Object> {
    return this.http
    .get(this.prefix + '/getBookings/' + userId)

    // return of('in service')
  }
}
