import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/PostDTO';
import { APIService } from '../../service/apiservice';
import { User } from '../../model/UserDto';
import { ToastService } from '../../service/toast-service';
import { SharedService } from '../../service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit, OnDestroy {

  @Input() article!: any;
  @Input() currentUser!:any;
  
  private subscription!: Subscription;

  constructor(private apiService: APIService, private toastService:ToastService, private sharedService: SharedService) { }

  ngOnInit(): void {
    // If currentUser is not passed as input, subscribe to shared service
    if (!this.currentUser) {
      this.subscription = this.sharedService.getCurrentUser().subscribe(
        (user: any) => {
          this.currentUser = user;
        }
      );
    }
  }

  rePost(post: any) {
    // Make sure currentUser exists before posting
    if (!this.currentUser || !this.currentUser.userId) {
      this.toastService.show('User not logged in');
      return;
    }

    const  user:User={
    userId:this.currentUser.userId
  }
    const postDto = new Post(
      undefined,
      post.title,
      post.description.substring(0, 200),
      post.urlToImage,
      new Date(post.publishedAt),
      post.comments,
      this.getRandomInteger(1,100),
      this.getRandomInteger(1,100),
      this.getRandomInteger(1,100),
      user,
    );
    this.apiService.savePost(postDto).subscribe(
      (data)=>{
        console.log(data);
        this.toastService.show(data.message)
      },(error)=>{
          console.log(error);
          this.toastService.show(error.message)
      }
    );
  }

  getRandomInteger(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
