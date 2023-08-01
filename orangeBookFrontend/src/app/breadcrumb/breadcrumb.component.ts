import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breadcrumb } from 'src/models/breadcrumb';
import { BreadcrumbService } from 'src/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  public breadcrumb: any;
  public isFirstChild = false;
 
  constructor() { 
  } 
  ngOnInit(): void {
    if(this.breadcrumb.length == 1){
      this.isFirstChild = true
    }
    if(this.breadcrumb[0].url != ''){

    }
  }
}
