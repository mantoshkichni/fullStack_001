import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { Header } from "../header/header";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-message',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit, OnDestroy {

  constructor(private sharedService:SharedService){}
  public selectedUser:any;
  public currentUser:any;
  private subscriptions: Subscription[] = [];
  messageList:string[]=["Hello","How are you?","I am fine😊","Hey👋", "I am fine😊","Had dinner?"];
  receiveMessage:string[]=["Hey👋", "I am fine😊","Had dinner?","Hey👋", "I am fine😊","Had dinner?","Hey👋", "I am fine😊","Had dinner?"]
  message!:string;

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.getProfileUser().subscribe(
        (data)=>{
          console.log("Selected User==>", data)
          this.selectedUser=data;
        },(error)=>{
          console.log(error);
        }
      )
    );

    this.subscriptions.push(
      this.sharedService.getCurrentUser().subscribe(
        (data)=>{
          console.log("currentUser==>",data);
          this.currentUser=data;
        },(error)=>{
          console.log(error);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  sendMessage() {
    // if (this.message && this.message.trim()) {
      this.messageList.push(this.message);
      this.message = "";
    // }
  }
}
