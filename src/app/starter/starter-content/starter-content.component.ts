import { Component, OnInit,HostListener,ANALYZE_FOR_ENTRY_COMPONENTS  } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { last } from '@angular/router/src/utils/collection';

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
  
  displayMsgFlag:boolean = false;
  newMsgVal:string='';
  newMsgFlag:string='';
  newMsgID:any;

  display='none';	
  bkData:string;
  inputfield:any;
 
  ngOnInit() { 
      this.getAllMessage(); 
  }

  addMessage(msgfalg: NgForm){ 

    if(this.inputfield != undefined){ 
            
              this.newMsgVal = msgfalg.value.inewmsg; 
              //setting new message data
              if(this.newMsgVal.trim() !=""){

                //setting new message to active
              if(this.displayMsgFlag == true){
                this.newMsgFlag = "Y";
              }else{
                this.newMsgFlag = "N";
              }
              
              //setting new message ID
              this.newMsgID = Math.max.apply(Math,this.messageList.map(function(o) { return o.msgID; })); 
              this.newMsgID = this.newMsgID + 1 

                const msgBody = {msgID: this.newMsgID, msg: this.newMsgVal.trim(), displayMsg: this.newMsgFlag}; 
                //sending to message.service for post
                this.messageService.addMessage(msgBody).subscribe((result) => {     
                  $("#save_msg").show();
                  $("#error_msg").hide();  
                  
                  setTimeout(function(this){  
                    $("#save_msg").hide();
                    $("#error_msg").hide(); 
                    $("#info_msg").hide();
                    this.getAllMessage();  
                  }, 5000); 

                }, err  => this.errorMsg = <any>err);  

                if(this.errorMsg !=""){
                  $("#save_msg").hide();
                  $("#error_msg").show();  
                  this.hideAllMsg();
                }
                
              }else{
                $("#save_msg").hide();
                $("#error_msg").hide(); 
                $("#info_msg").show(); 
              } 

              msgfalg.reset();  
              this.hideAllMsg(); 
    }else{
      $("#info_msg").show(); 
      this.hideAllMsg();           
    }
    this.errorMsg = "";
  }


  hideAllMsg(){
    setTimeout(function(){  
      $("#save_msg").hide();
      $("#error_msg").hide(); 
      $("#info_msg").hide();  
    }, 5000); 
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

  // lenghtValidate(data:any){
  //   if(data.length >=70){
  //     alert("Message Should Not Be More Than 70 Characters.");
  //     return false;
  //   }
  //   return true;
  // } 

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
    
    console.log(data);
    console.log(bkDataObj);
 

    let tmp = data.msg; 
    let updatedStr = tmp.trim();
    $("#info_"+data.msgID).hide();
    $("#save_"+data.msgID).hide();
    $("#error_"+data.msgID).hide(); 

    let flag = true;

 
    if(updatedStr =="" || updatedStr == undefined){ 
      flag = false;
      $("#info_"+data.msgID).val("Massge must have at least one character");
      $("#info_"+data.msgID).show();
     // this.messageList[i].msg = bkDataObj[i].msg;
    }
    if(bkDataObj[i].msg == updatedStr && data.displayMsg == bkDataObj[i].displayMsg ){ 
      flag = false;
      $("#info_"+data.msgID).val("Massge must have at least one character");
      $("#info_"+data.msgID).show();
     this.messageList[i].msg = updatedStr;  
    }
    
    if(flag){         

      const msgBody = {msgID: data.msgID, msg: data.msg.trim(), displayMsg: data.displayMsg}; 
      console.log(msgBody);

        this.messageService.updateMessage(msgBody).subscribe((result) => {                 
        $("#info_"+data.msgID).hide();
        $("#save_"+data.msgID).show();
        $("#error_"+data.msgID).hide();


        setTimeout(function(this){ 
          $("#info_"+data.msgID).hide();
          $("#save_"+data.msgID).hide();
          $("#error_"+data.msgID).hide(); 
          this.getAllMessage();
         }, 5000);


      }, err  => this.errorMsg = <any>err); 
 
      if(this.errorMsg){
        $("#info_"+data.msgID).hide();
        $("#save_"+data.msgID).hide();
        $("#error_"+data.msgID).show();
      }
 
    } 
      setTimeout(function(){ 
        $("#info_"+data.msgID).hide();
        $("#save_"+data.msgID).hide();
        $("#error_"+data.msgID).hide(); 
       }, 5000);
  }
 
  deleteMessage(data:any){
    console.log(data);
    if(window.confirm("Are you sure?")) {
      this.messageService.deleteMessage(data).subscribe((result) => {        
        console.log(result);
        this.getAllMessage();
      }, err  => this.errorMsg = <any>err);
    }
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
