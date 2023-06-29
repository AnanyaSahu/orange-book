import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public isUserLoggedIn =  new BehaviorSubject(false);
  public userDetailsAndToken =  new BehaviorSubject<any>(null);
  
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

  constructor(private http: HttpClient,
    private auth: AuthService) { 

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
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .put(this.prefix + '/updateAccount/' + userId, params,{ headers })

    // return of('in service')
  }

  
  public getAccountDetails(userId: number): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .get(this.prefix + '/getAccountDetails/' + userId,{ headers })

    // return of('in service')
  }
  
  public getBookings(userId: number): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .get(this.prefix + '/getBookings/' + userId,{ headers })

    // return of('in service')
  }
}
