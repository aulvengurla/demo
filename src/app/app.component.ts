import { Component,OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit() { 
    this.checkAuth(); 
  }

  checkAuth():void{
   
           this.authService.checkAuth().subscribe( 
            result => {
              // Handle result
              this.router.navigate(['/starter']); 

              localStorage.setItem("userDetails", JSON.stringify(result));


            },
            error => {
              console.log(error)
              this.errorMsg = error;
            },
          );
      
  }

}
