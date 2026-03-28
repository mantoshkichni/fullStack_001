import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/UserDto';
import { Post } from '../model/PostDTO';
import { Observable } from 'rxjs';
import { LoginResponse } from '../model/loginResponse';

interface PostResponse {
  message: string;
  stsusCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class APIService {

  private profileUser: any;
  private following:any[]=[];
  private followers:any[]=[];
  private friends:any[]=[];
  private currentUser:any;

  private apiUrl = 'http://localhost:8080/api';
  private newsURL = "https://newsapi.org/v2/top-headlines/sources?"
  private apiKey = "fa3eaa3dc2b947e7958de87e8ef715d8";
  private latestNews = 'https://newsapi.org/v2/top-headlines?country=us';
  private homeScreenURL = "https://newsapi.org/v2/everything?q=india&from=2026-03-11&sortBy=publishedAt&apiKey=fa3eaa3dc2b947e7958de87e8ef715d8";
  constructor(private http: HttpClient) { }

  

  saveUser(data: User) {
    return this.http.post(`${this.apiUrl}/saveUser`, data);
  }

  userLogin(data: any) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  getNewsByCategory(category: string) {
    return this.http.get(`https://newsapi.org/v2/everything?q=${category}&from=2026-03-11&sortBy=publishedAt&apiKey=fa3eaa3dc2b947e7958de87e8ef715d8`);
  }

  getLatestNews() {
    return this.http.get(`${this.latestNews}&apiKey=${this.apiKey}`);
  }

  getAllUser() {
    return this.http.get(`${this.apiUrl}/getAllUser`);
  }

  getHomeScreenContents() {
    return this.http.get(this.homeScreenURL);
  }

  followUser(currentUserId: number, targetUserId: number) {
    return this.http.post(
      `${this.apiUrl}/follow?followerId=${currentUserId}&followingId=${targetUserId}`,
      {}
    );
  }

  getUserFollowers(userId: number) {
    return this.http.post<any[]>(`${this.apiUrl}/getUserFollowers?userId=${userId}`, {});
  }

  getUserFollowing(userId: number) {
    return this.http.post<any[]>(`${this.apiUrl}/getUserFollowing?userId=${userId}`, {});
  }

  savePost(post: Post): Observable<PostResponse> {
    return this.http.post<PostResponse>(`${this.apiUrl}/savePost`, post)
  }

  setProfileUser(user: any) {
    this.profileUser=user;
  }

  getProfileUser(): any {
    return this.profileUser;
  }

  setFollowing(data:any[]){
    this.following=data;
  }
  getFollowing():any[]{
    return this.following;
  }
  setFollowers(data:any[]){
    this.followers=data;
  }
  getFollowers():any[]{
    return this.followers;
  }
  setCurrentUser(user:any){
    this.currentUser=user;
  }
  getCurrentUser(){
    return this.currentUser;
  }
  setFriends(friends:any[]){
    this.friends=friends;
  }
  getFriends():any[]{
    return this.friends;
  }

  getChat(user1Id: number, user2Id: number) {
  return this.http.get<any[]>(
    `http://localhost:8080/api/chat/${user1Id}/${user2Id}`
  );
}

}