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
  constructor(private authService:AuthService, private router: Router) {  this.checkAuth();  }

  ngOnInit() { 
    
  }

  checkAuth():void{
   
           this.authService.checkAuth().subscribe( 
            result => {
              console.log(result);
              result = null; 
              // Handle result
              if(result !=null && result.status == "success"){
                this.router.navigate(['/starter']); 
                localStorage.setItem("userDetails", JSON.stringify(result)); 
              } else{
                this.errorMsg = "OOps Error..Something went wrong..!!";
              }

              
            },
            error => { 
              this.errorMsg = error;
              this.errorMsg = "OOps Error..Something went wrong..!!";
            },
          );
      
  }

}
