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

  //  private prefix = 'http://127.0.0.1:5000'
  private prefix = ''
  constructor(private http: HttpClient,
    private auth: AuthService) { 

  }



  public createUserAccount(params: any): Observable<Object> {

    return this.http
    .post(this.prefix + '/createAccount', params)
 
  }

  public verifyUserAccount(params: any): Observable<any> {
    return this.http
    .post(this.prefix + '/verifyAccount', params)

  }

  
  public updateUserAccount(userId: number, params: any): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .put(this.prefix + '/updateAccount/' + userId, params,{ headers })
  }

  
  public getAccountDetails(userId: number): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .get(this.prefix + '/getAccountDetails/' + userId,{ headers })


  }
  
  public getBookings(userId: number): Observable<Object> {
    const token = this.auth.getAccessToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
    .get(this.prefix + '/getBookings/' + userId,{ headers })


  }

  // resetPassword
  public updateUserPassword(userId: string, params: any): Observable<Object> {
    return this.http
    .put(this.prefix + '/resetPassword/' + userId, params)
  }


  
  public accessTokenFBUser(userId: number): Observable<Object> {
    return this.http
    .get(this.prefix + '/accessTokenFBUser/' + userId)


  }


}
