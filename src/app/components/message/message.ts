import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { Header } from "../header/header";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule } from "@angular/forms";
import { ChatService } from '../../service/chat-service';
import { APIService } from '../../service/apiservice';
import { ChatMessage } from '../../model/ChatMessage';


@Component({
  selector: 'app-message',
  imports: [Header, CommonModule, FormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit, OnDestroy {

  constructor(private sharedService: SharedService, private chatService: ChatService, private apiService: APIService) { }
  public selectedUser: any;
  public currentUser: any;
  private subscriptions: Subscription[] = [];
  messageList: ChatMessage[] = []
  message!: string;

  ngOnInit(): void {
    this.subscriptions.push(
      this.sharedService.getProfileUser().subscribe(
        (data) => {
          console.log("Selected User==>", data)
          this.selectedUser = data;
        }, (error) => {
          console.log(error);
        }
      )
    );

    this.subscriptions.push(
      this.sharedService.getCurrentUser().subscribe(
        (data) => {
          console.log("currentUser==>", data);
          this.currentUser = data;
        }, (error) => {
          console.log(error);
        }
      )
    );
    this.chatService.connect(this.currentUser.userId);

    // load old messages
    this.apiService.getChat(this.currentUser.userId, this.selectedUser.userId)
      .subscribe(data => {
        this.chatService.setMessages(data);
      });

    this.chatService.messages$.subscribe(data => {
      this.messageList = data;
    });

    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  sendMessage() {
    if (!this.message?.trim()) return;

    const msg = {
      senderId: this.currentUser.userId,
      receiverId: this.selectedUser.userId,
      content: this.message
    };
    this.messageList.push(msg);
    this.chatService.sendMessage(msg);
    this.message = '';
  }
}
