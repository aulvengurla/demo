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
  constructor(private authService:AuthService, private router: Router) {   }

  ngOnInit() {   
    if(localStorage.length > 0){
      this.checkAuth(); 
    }else{
      this.router.navigate(['/logout']); 
    }
    
  }

  checkAuth():void{
  
           this.authService.checkAuth().subscribe( 
            result => {
              console.log(result);
            //  result = null; 
              // Handle result
              if(result !=null && result.status == "success"){
                localStorage.setItem("userDetails", JSON.stringify(result)); 
                this.router.navigate(['/starter']);  
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
