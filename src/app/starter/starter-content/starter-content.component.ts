import { Component, OnInit,HostListener, ANALYZE_FOR_ENTRY_COMPONENTS  } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

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
  display='none';
   
  bkData:string;

  ngOnInit() { 
      this.getAllMessage(); 
  }
 
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === "Escape") {  
      this.messageList[this.updateMsg].msg = this.originalVal;
    }
  }

  lenghtValidate(data:any){ 
    console.log(data);
    if(data.length >=75){
      alert("Message Should Not Be More Than 75 Characters.");
      return false;
    }
    
    return true;
  }  

  getAllMessage(){
    this.messageService.getAllMessage().subscribe((messageList) => { 
      this.messageList = messageList;
      this.bkData = JSON.stringify(messageList); 
      console.log(this.messageList);
    }, err  => this.errorMsg = <any>err);
  }

  
  updateMessage(data:any,i){ 
    this.errorMsg = '';
    let bkDataObj = JSON.parse(this.bkData); 
    let updatedStr = data.msg.replace(/ /g, "");
    console.log(updatedStr);

    $("#info_"+data.msgID).hide();
    $("#save_"+data.msgID).hide();
    $("#error_"+data.msgID).hide();

    if(bkDataObj[i].msg == updatedStr){   
     $("#info_"+data.msgID).show();
    }else{        
      this.messageService.updateMessage(data).subscribe((result) => {        
        console.log(result);
        this.getAllMessage();
        $("#info_"+data.msgID).hide();
        $("#save_"+data.msgID).show();
        $("#error_"+data.msgID).hide();

      }, err  => this.errorMsg = <any>err); 

      console.log(this.errorMsg);

      if(this.errorMsg){
        $("#info_"+data.msgID).hide();
        $("#save_"+data.msgID).hide();
        $("#error_"+data.msgID).show();
      }
 
    }

    
     

  }

  persistMsgTmp(data:any){
    this.display='block'; 
    console.log(data);
    window.localStorage.setItem("dataForDelete",JSON.stringify(data));
  }

  removeDeleteData(){
    window.localStorage.removeItem("dataForDelete");
    this.display='none'; 
  }

  deleteMessage(){ 

    let data = JSON.parse(window.localStorage.getItem("dataForDelete"));
    this.messageService.deleteMessage(data).subscribe((result) => {        
      console.log(result);
      this.getAllMessage();
      this.removeDeleteData(); 
    }, err  => this.errorMsg = <any>err);

    this.display='none'; 
    
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
