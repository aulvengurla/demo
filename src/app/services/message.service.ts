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
    // let url = 'http://wallboardservices.corp.tcf.biz/Wallboard/Message/All';
    
      return this.http.get(url)
          .map((response: Response) => {
                  return response.json();
              }
          ).catch((e: any) => Observable.throw(this.errorHandler(e)));

   }

   public addMessage(data:any): Observable<any> {

    //let url = '';
    //let url = "http://wallboardservices.corp.tcf.biz/Wallboard/Message/?msgID=7&msg=2017 NYE!!!&displayMsg=Y";
    let url = "http://wallboardservices.corp.tcf.biz/Wallboard/Message/?msgID="+data.msgID+"&msg="+data.msg+"&displayMsg="+data.displayMsg;
      return this.http.post(url,data)
         .map((response: Response) => {
                   return response.json();
             }
         ).catch((e: any) => Observable.throw(this.errorHandler(e)));

   }


   public updateMessage(data:any): Observable<any> {  

        //  let url = '';
          let url = "http://wallboardservices.corp.tcf.biz/Wallboard/Message/?msgID="+data.msgID+"&msg="+data.msg+"&displayMsg="+data.displayMsg;
          return this.http.put(url,data)
              .map((response: Response) => {
                      return response.json();
                  }
              ).catch((e: any) => Observable.throw(this.errorHandler(e))); 
                
   }
 
    public deleteMessage(data:any): Observable<any> { 
         
             // let url = '';
             let url = "http://wallboardservices.corp.tcf.biz/Wallboard/Message/?msgID="+data.msgID+"&msg="+data.msg+"&displayMsg="+data.displayMsg;
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
