import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { APIService } from '../../service/apiservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../service/chat-service';
import { ChatMessage } from '../../model/ChatMessage';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

 
  constructor(private apiService: APIService, private router: Router, private sharedService: SharedService, private chatService: ChatService) { }
  public followingUsers: any[] = [];
  public followers: any[] = [];
  public friends: any[] = []
  private subscriptions: Subscription[] = [];
  public quickMessage: string = '';
  public currentUser: any;
   quickMessages: ChatMessage[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.apiService.getUserFollowers(1).subscribe((data: any) => {
        console.log('Followers data:', data);
        this.followingUsers = data;
        this.sharedService.setFollowing(data); // Share globally via SharedService
        this.friends = [...this.friends, ...data];
      })
    );

    this.subscriptions.push(
      this.apiService.getUserFollowing(1).subscribe((data: any) => {
        console.log('Following data:', data);
        this.followers = data;
        this.sharedService.setFollowers(data); // Share globally via SharedService
        this.friends = [...this.friends, ...data];
      })
    );
    this.sharedService.setFriends(this.friends); // Share globally via SharedService
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
    this.subscriptions.push(
      this.chatService.quickMessages$.subscribe(data => {
        this.quickMessages = data; // Replace instead of push to avoid duplicates
      })
    );
  }

  navigateToMesagePage(userData: any) {
    this.sharedService.setProfileUser(userData); // Use SharedService instead of APIService
    this.router.navigate(['/message']);
  }

  navigateToProfile(userData: any) {
    this.sharedService.setProfileUser(userData); // Use SharedService instead of APIService
    this.router.navigate(["/profile"]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Error scrolling to bottom:', err);
    }
  }

  sendQuickMessage() {
    const quickChatMessage={
      senderId: this.currentUser.userId,
      receiverId: 0,
      content: this.quickMessage,
      isQuickMessage: true,
      timeSTamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    console.log('Quick Message:', quickChatMessage);
    this.chatService.sendMessage(quickChatMessage); // sendMessage handles all emissions
    this.quickMessage = ''; // Clear the textarea after sending
  }

  getSenderImage(senderId: number): string {
    if (senderId === this.currentUser?.userId) {
      return this.currentUser?.profilePhoto || 'assets/default-avatar.png';
    }
    const sender = this.friends.find(f => f.userId === senderId);
    return sender?.profilePhoto || 'assets/default-avatar.png';
  }
}
