import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("userDetails") !=null){
      localStorage.removeItem("userDetails");
    }
    
  }

}
