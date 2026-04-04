import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {

  private stompClient!: Client;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatusSubject.asObservable();

  public quickMessageSubject = new BehaviorSubject<any[]>([]);
  quickMessages$ = this.quickMessageSubject.asObservable();

  private quickMessages: any[] = [];
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
      this.connectionStatusSubject.next(true);
      
      this.stompClient.subscribe(`/topic/quickMessages`, (msg) => {
        const message = JSON.parse(msg.body);
        // Add timestamp if not provided by backend
        if (!message.timeSTamp) {
          message.timeSTamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        if (message.senderId != userId ) {
          this.quickMessages.push(message);
          this.quickMessageSubject.next([...this.quickMessages]);
          this.messagesSubject.next(this.quickMessages);
        }
        console.log('📨 Message received:', message);
      });

      // drain pending messages queue
      while (this.pendingMessages.length > 0) {
        const m = this.pendingMessages.shift();
        this.stompClient.publish({
          destination: '/app/sendQuickMessage',
          body: JSON.stringify(m)
        });
        console.log('📤 Pending message sent:', m);
      }
    };

    this.stompClient.onStompError = (frame) => {
      console.error('❌ STOMP error:', frame);
      this.connectionStatusSubject.next(false);
    };

    this.stompClient.onWebSocketError = (evt) => {
      console.error('❌ WebSocket error:', evt);
      this.connectionStatusSubject.next(false);
    };

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    // add to UI instantly regardless of connection status
    if (!this.quickMessages.some(m => m === message)) { // Avoid duplicates
      this.quickMessages.push(message);
      this.quickMessageSubject.next([...this.quickMessages]);
      this.messagesSubject.next(this.quickMessages);
    }

    // send to backend if connected, otherwise queue
    const isConnected = this.connectionStatusSubject.value;
    if (isConnected) {
      this.stompClient.publish({
        destination: '/app/sendQuickMessage',
        body: JSON.stringify(message)
      });
      console.log('📤 Message sent:', message);
    } else {
      this.pendingMessages.push(message);
      console.warn('⏳ Message queued (not connected):', message);
    }
  }

  setMessages(messages: any[]) {
    this.quickMessages = messages;
    this.messagesSubject.next(this.quickMessages);
  }

  isConnected(): boolean {
    return this.connectionStatusSubject.value;
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.connectionStatusSubject.next(false);
    }
  }
}

