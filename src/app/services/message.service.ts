import { Injectable } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import {HttpClientModule, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class MessageService {

 constructor(public http: Http) { }

   public getAllMessage(): Observable<any> {  

     let url = 'assets/mock-json/all-messages.json';
    
    
      return this.http.get(url)
          .map((response: Response) => {
                  return response.json();
              }
          ).catch((e: any) => Observable.throw(this.errorHandler(e)));

   }

   public addMessage(data:any): Observable<any> {
console.log(data);
    let url = '';
       return this.http.post(url,data)
         .map((response: Response) => {
                   return response.json();
             }
         ).catch((e: any) => Observable.throw(this.errorHandler(e)));

   }


   public updateMessage(data:any): Observable<any> {  

          let url = '';
          
          return this.http.put(url,data)
              .map((response: Response) => {
                      return response.json();
                  }
              ).catch((e: any) => Observable.throw(this.errorHandler(e))); 
                
   }
 
    public deleteMessage(data:any): Observable<any> { 
         
             let url = '';
             
              return this.http.delete(url,data)
                  .map((response: Response) => {
                          return response.json();
                      }
                  ).catch((e: any) => Observable.throw(this.errorHandler(e)));        
    }


   errorHandler(error: any): void {
      console.log(error);
   }

}
