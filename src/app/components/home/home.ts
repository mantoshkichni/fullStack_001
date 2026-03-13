import { Component, OnInit, Output } from '@angular/core';
import { Header } from "../header/header";
import { Card } from "../card/card";
import { LeftPanel } from "../left-panel/left-panel";
import { RightPanel } from "../right-panel/right-panel";
import { APIService } from '../../service/apiservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [Header, Card, LeftPanel, RightPanel, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  constructor(private apiService: APIService) { }
  public currentUser!: any;

  newArticles: any[] = [];
  users: any[] = [];
  ngOnInit() {
    this.apiService.getLatestNews().subscribe(
      (data: any) => {
        this.newArticles = data.articles;
      },
      (error) => {
        console.error('Error fetching latest news articles:', error);
      }
    );
    this.apiService.getAllUser().subscribe(
      (data: any) => {
        this.users = data;
        this.currentUser = this.users[0]; // Set the current user to the first user
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );

    this.apiService.getHomeScreenContents().subscribe(
      (data: any) => {
        this.newArticles = data.articles;
      },
      (error) => {
        console.error('Error fetching home screen contents:', error);
      }
    );
  }

  onCategorySelected(category: string) {
    if (category == 'latestNews') {
      this.apiService.getLatestNews().subscribe(
        (data: any) => {
          this.newArticles = data.articles;
        },
        (error) => {
          console.error('Error fetching latest news articles:', error);
        }
      );
    } else {
      this.apiService.getNewsByCategory(category).subscribe(
        (data: any) => {
          this.newArticles = data.articles;
        },
        (error) => {
          console.error('Error fetching news articles:', error);
        }
      );
    }

  }
  onSearchValueChanged(searchValue: string) {
    this.apiService.getNewsByCategory(searchValue).subscribe(
      (data: any) => {
        this.newArticles = data.articles;
      },
      (error) => {
        console.error('Error fetching news articles:', error);
      }
    );
  }
}
