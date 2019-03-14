import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import {HttpClientModule, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService {

 constructor(public http: Http) { }

   public checkAuth(): Observable<any> {  

     let url = 'assets/mock-json/auth.json'; 
      return this.http.get(url)
          .map((response: Response) => {
                  return response.json();
              }
          ).catch((e: any) => Observable.throw(this.errorHandler(e)));

   }   

   errorHandler(error: any): void {
      console.log(error);
   }

}
