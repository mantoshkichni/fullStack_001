import { AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';
import { APIService } from '../../service/apiservice';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-right-panel',
  imports: [CommonModule],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel implements OnInit, OnDestroy {

  constructor(private apiService: APIService, private router:Router, private sharedService: SharedService) { }
  public followingUsers: any[] = [];
  public followers: any[] = [];
  public friends: any[] = []
  private subscriptions: Subscription[] = [];

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
}
