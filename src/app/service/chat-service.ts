import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private stompClient!: Client;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private messages: any[] = [];

  connect(userId: number) {
    const socket = new SockJS('http://localhost:8080/chat');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000
    });

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe(`/user/${userId}/queue/messages`, (msg) => {
        const message = JSON.parse(msg.body);
        this.messages.push(message);
        this.messagesSubject.next(this.messages);
      });
    };

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    this.stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify(message)
    });

    // add to UI instantly
    this.messages.push(message);
    this.messagesSubject.next(this.messages);
  }

  setMessages(messages: any[]) {
    this.messages = messages;
    this.messagesSubject.next(this.messages);
  }
}