import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';



@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

public breadCrumb = new BehaviorSubject<Breadcrumb[]>([{'url': '', label: ''}])
 
}
