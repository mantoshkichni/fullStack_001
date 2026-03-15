import { AfterViewInit, Component, OnInit } from '@angular/core';
import { APIService } from '../../service/apiservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel implements OnInit{
  constructor( private apiService: APIService){}
  public followingUsers: any[] = [];
  public followers: any[] = [];

  ngOnInit(): void {
    this.apiService.getUserFollowers(1).subscribe((data: any) => {
      console.log('Followers data:', data);
      this.followingUsers = data;
    });

    this.apiService.getUserFollowing(1).subscribe((data: any) => {
      console.log('Following data:', data);
      this.followers = data;
    });
  }




}
