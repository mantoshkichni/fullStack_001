import { Component } from '@angular/core';
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
export class Home {
  constructor(private apiService: APIService) {}

  newArticles: any[] = [];
  onCategorySelected(category: string) {
    this.apiService.getNewsByCategory(category).subscribe(
      (data: any) => {
      this.newArticles = data.sources;
    },
    (error) => {
      console.error('Error fetching news articles:', error);
    }
  );
  }
}
