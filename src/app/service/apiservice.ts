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
  constructor(private http: HttpClient) { }

  saveUser(data: User) {
    return this.http.post(`${this.apiUrl}/saveUser`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getNewsByCategory(category: string) {
    return this.http.get(`${this.newsURL}category=${category}&apiKey=${this.apiKey}`);
  }

}
