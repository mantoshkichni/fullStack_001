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
  private pendingMessages: any[] = [];

  connect(userId: number) {
    const socket = new SockJS('http://localhost:8080/chat', null, {
      transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      withCredentials: true
    } as any);

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str)
    });

    this.stompClient.onConnect = () => {
      console.log('✅ STOMP connected');
      
      this.stompClient.subscribe(`/topic/messages`, (msg) => {
        const message = JSON.parse(msg.body);
        this.messages.push(message);
        this.messagesSubject.next(this.messages);
        console.log('📨 Message received:', message);
      });

      // drain pending messages queue
      while (this.pendingMessages.length > 0) {
        const m = this.pendingMessages.shift();
        this.stompClient.publish({
          destination: '/app/sendMessage',
          body: JSON.stringify(m)
        });
        console.log('📤 Pending message sent:', m);
      }
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame);
    };

    this.stompClient.onWebSocketError = (evt) => {
      console.error('❌ WebSocket error:', evt);
    };

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    // add to UI instantly regardless of connection status
    this.messages.push(message);
    this.messagesSubject.next(this.messages);

    // send to backend if connected, otherwise queue
    const isConnected = this.stompClient && (this.stompClient as any).connected === true;
    if (isConnected) {
      this.stompClient.publish({
        destination: '/app/sendMessage',
        body: JSON.stringify(message)
      });
      console.log('📤 Message sent:', message);
    } else {
      this.pendingMessages.push(message);
      console.warn('⏳ Message queued (not connected):', message);
    }
  }

  setMessages(messages: any[]) {
    this.messages = messages;
    this.messagesSubject.next(this.messages);
  }

  isConnected(): boolean {
    return this.stompClient && (this.stompClient as any).connected === true;
  }

  disconnect() {
    if (this.stompClient && (this.stompClient as any).connected) {
      this.stompClient.deactivate();
    }
  }
}

