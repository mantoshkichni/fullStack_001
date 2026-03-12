import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/UserDto';

@Injectable({
  providedIn: 'root',
})
export class APIService {
 
  private apiUrl = 'http://localhost:8080/api'; 
  private newsURL="https://newsapi.org/v2/top-headlines/sources?"
  private apiKey="fa3eaa3dc2b947e7958de87e8ef715d8";
  private latestNews='https://newsapi.org/v2/top-headlines?country=us';
  private homeScreenURL="https://newsapi.org/v2/everything?q=india&from=2026-03-11&sortBy=publishedAt&apiKey=fa3eaa3dc2b947e7958de87e8ef715d8";
  constructor(private http: HttpClient) { }

  saveUser(data: User) {
    return this.http.post(`${this.apiUrl}/saveUser`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getNewsByCategory(category: string) {
    return this.http.get(`https://newsapi.org/v2/everything?q=${category}&from=2026-03-11&sortBy=publishedAt&apiKey=fa3eaa3dc2b947e7958de87e8ef715d8`);
  }

   getLatestNews() {
    return this.http.get(`${this.latestNews}&apiKey=${this.apiKey}`);
  }

  getAllUser(){
    return this.http.get(`${this.apiUrl}/getAllUser`);
  }

  getHomeScreenContents() {
    return this.http.get(this.homeScreenURL);
  }

}
