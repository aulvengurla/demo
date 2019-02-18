import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent implements OnInit {
  title = 'app';
  errorMsg:string;
  successMsg:string;
  errorMsgx:string;
  constructor(private authService:AuthService) { }

  ngOnInit() { 
    this.checkAuth(); 
  }

  checkAuth():void{
   
           this.authService.checkAuth().subscribe( 
            result => {
              // Handle result
              console.log(result)
              this.successMsg = result;
            },
            error => {
              console.log(error)
              this.errorMsg = error;
            },
          );
      
  }

}
