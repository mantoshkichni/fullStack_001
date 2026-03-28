import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Header } from "../header/header";
import { Card } from "../card/card";
import { LeftPanel } from "../left-panel/left-panel";
import { RightPanel } from "../right-panel/right-panel";
import { APIService } from '../../service/apiservice';
import { CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-home',
  imports: [Header, Card, LeftPanel, RightPanel, CommonModule, InfiniteScrollDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  constructor(private apiService: APIService, private sharedService: SharedService) { }
  public currentUser!: any;
  public followingUsers: any[] = [];

  newArticles: any[] = [];
  users: any[] = [];
  homeScreenData: any[] = [];
  pageCount: number = 1;
  size: number = 20;
  private subscriptions: any[] = [];

  ngOnInit() {
    // this.apiService.getLatestNews().subscribe(
    //   (data: any) => {
    //     this.newArticles = data.articles;
    //   },
    //   (error) => {
    //     console.error('Error fetching latest news articles:', error);
    //   }
    // );
    this.subscriptions.push(
      this.apiService.getAllUser().subscribe(
        (data: any) => {
          this.currentUser = this.sharedService.getCurrentUser(); // Set the current user to the first user
          // this.sharedService.setCurrentUser(data[0]); // Share globally via SharedService
          this.users = data.filter((user: any) => user.userId !== this.currentUser.userId);
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      )
    );

    this.subscriptions.push(
      this.apiService.getHomeScreenContents().subscribe(
        (data: any) => {
          this.homeScreenData = data.articles;
          this.newArticles = data.articles.slice(0, 20);
        },
        (error) => {
          console.error('Error fetching home screen contents:', error);
        }
      )
    );
  }

  onCategorySelected(category: string) {
    if (category == 'latestNews') {
      this.subscriptions.push(
        this.apiService.getLatestNews().subscribe(
          (data: any) => {
            this.homeScreenData = data.articles;
            this.newArticles = data.articles;
          },
          (error) => {
            console.error('Error fetching latest news articles:', error);
          }
        )
      );
    } else {
      this.subscriptions.push(
        this.apiService.getNewsByCategory(category).subscribe(
          (data: any) => {
            this.homeScreenData = data.articles;
            this.newArticles = data.articles;
          },
          (error) => {
            console.error('Error fetching news articles:', error);
          }
        )
      );
    }

  }
  onSearchValueChanged(searchValue: string) {
    this.subscriptions.push(
      this.apiService.getNewsByCategory(searchValue).subscribe(
        (data: any) => {
          this.homeScreenData = data.articles;
          this.newArticles = data.articles;
        },
        (error) => {
          console.error('Error fetching news articles:', error);
        }
      )
    );
  }

  onScroll() {
    let startindex: number = this.pageCount * this.size;
    let endindex: number = startindex + this.size;
    
    // Prevent loading if we've reached the end
    if (startindex >= this.homeScreenData.length) {
      return;
    }
    
    const newItems = this.homeScreenData.slice(startindex, endindex);
    if (newItems.length > 0) {
      this.newArticles = this.newArticles.concat(newItems);
      this.pageCount++;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
