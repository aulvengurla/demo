import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-starter-content',
  templateUrl: './starter-content.component.html',
  styleUrls: ['./starter-content.component.css'],
  providers:[MessageService]
})
export class StarterContentComponent implements OnInit {

  constructor(private messageService:MessageService) { }

  messageModule:boolean = false;
  imgModule:boolean =false;
  errorMsg:string;
  messageList:any;
  msgdata:boolean =true;

  ngOnInit() { 
      this.getAllMessage(); 
  }


  getAllMessage(){
    this.messageService.getAllMessage().subscribe((messageList) => { 
      this.messageList = messageList;
      console.log(this.messageList);
    }, err  => this.errorMsg = <any>err);
  }

  
  updateMessage(data:any){ 
 
     console.log(data);
     this.messageService.updateMessage(data).subscribe((result) => {        
      console.log(result);
      this.getAllMessage();
    }, err  => this.errorMsg = <any>err); 
  }

  deleteMessage(data:any){
    console.log(data);
    this.messageService.deleteMessage(data).subscribe((result) => {        
      console.log(result);
      this.getAllMessage();
    }, err  => this.errorMsg = <any>err);
  }

  selectedSection(item:any){
    if(item == "message"){
      this.messageModule = true;
      this.imgModule = false;
    }
    if(item == "image"){
      this.imgModule = true;
      this.messageModule = false; 
    } 
  }


  getStatus(data:any){ 

      if(data.displayMsg == "N"){ 
          return false;
      } else{
        return true;
      }
      
  }

  getStatusChk(ev,data){ 
    if(ev.target.checked){
      data.displayMsg = "Y";
    }else{
      data.displayMsg = "N";
    }
    
  }

}
