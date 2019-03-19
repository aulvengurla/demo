import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter-header',
  templateUrl: './starter-header.component.html',
  styleUrls: ['./starter-header.component.css']
})
export class StarterHeaderComponent implements OnInit {

  timeNow: any;
  loggedInUserDetails:any;
  errorMsg:String;

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() { 
    var userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if(userDetails !=null && userDetails !=undefined){
      this.loggedInUserDetails = userDetails;
    }
    this.timeNow = Observable.interval(1000).map(x => new Date()).share();
  }

  logout():void{   
           this.authService.logout().subscribe((result) => {  
            console.log(result);
            if(result.status == "success"){
              localStorage.removeItem("userDetails");
              this.router.navigate(['/logout']); 
            }
          }, err  => this.errorMsg = <any>err); 
  }

}
