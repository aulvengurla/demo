import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {

  timeNow: any;
  loggedInUserDetails:any;

  constructor() { }

  ngOnInit() { 
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if(userDetails !=null && userDetails !=undefined){
      this.loggedInUserDetails = userDetails;
    }
    this.timeNow = Observable.interval(1000).map(x => new Date()).share();
  }

}
