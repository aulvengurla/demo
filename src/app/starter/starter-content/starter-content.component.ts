import { Component, OnInit,HostListener  } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  originalVal:string='';
  msgInputId:any;
  inputString = "ipt_";
  updateMsg : any;
  ngOnInit() { 
      this.getAllMessage(); 
  }

  getOrignalVal(data:any,id,i){ 
     this.originalVal = data;
     this.msgInputId = id;
     this.updateMsg = i;
  }
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {  
      this.messageList[this.updateMsg].msg = this.originalVal;
    }
  }

  lenghtValidate(data:any,i){ 
    alert(data+"   "+i);
    console.log(this.messageList);
    if(data.length >=75){
      alert("Message Should Not Be More Than 75 Characters.");
      return false;
    }
    if(data != this.messageList[i].msg){
        
    }
    return true;
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
