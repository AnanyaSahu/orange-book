import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  public isUserLoggedIn =  new BehaviorSubject(false);

  constructor() { }
}
