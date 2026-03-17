import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../model/PostDTO';
import { APIService } from '../../service/apiservice';
import { User } from '../../model/UserDto';
@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  @Input() article!: any;
  @Input() currentUser!:any;
  

  constructor(private apiService: APIService) { }
  rePost(post: any) {
    const  user:User={
    userId:this.currentUser.userId
  }
    const postDto = new Post(
      undefined,
      post.title,
      post.description.split(' ').slice(0, 200).join(' '),
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
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  getRandomInteger(min: number = 0, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
