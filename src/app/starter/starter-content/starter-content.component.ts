import { Component, OnInit } from '@angular/core';
// Variable in assets/js/scripts.js file
declare var AdminLTE: any;

@Component({
  selector: 'app-starter-content',
  templateUrl: './starter-content.component.html',
  styleUrls: ['./starter-content.component.css']
})
export class StarterContentComponent implements OnInit {

  constructor() { }

  messageModule = false;
  imgModule =false;

  ngOnInit() {
    // Update the AdminLTE layouts
   // AdminLTE.init();
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

}
