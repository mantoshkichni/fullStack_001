import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // BehaviorSubject to hold and emit the current user
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // BehaviorSubject to hold and emit the profile user
  private profileUserSubject = new BehaviorSubject<any>(null);
  public profileUser$ = this.profileUserSubject.asObservable();

  // BehaviorSubject for following users
  private followingSubject = new BehaviorSubject<any[]>([]);
  public following$ = this.followingSubject.asObservable();

  // BehaviorSubject for followers
  private followersSubject = new BehaviorSubject<any[]>([]);
  public followers$ = this.followersSubject.asObservable();

  // BehaviorSubject for friends
  private friendsSubject = new BehaviorSubject<any[]>([]);
  public friends$ = this.friendsSubject.asObservable();

  //BehaviourSubject for selectedUser
  private selectedUserSubject= new BehaviorSubject<any>([]);
  public selectedUser$=this.selectedUserSubject.asObservable();

  constructor() {}

  // Methods to update current user
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser$;
  }

  // Methods to update profile user
  setProfileUser(user: any): void {
    this.profileUserSubject.next(user);
  }

  getProfileUser(): Observable<any> {
    return this.profileUser$;
  }

  // Methods to update following
  setFollowing(following: any[]): void {
    this.followingSubject.next(following);
  }

  getFollowing(): Observable<any[]> {
    return this.following$;
  }

  // Methods to update followers
  setFollowers(followers: any[]): void {
    this.followersSubject.next(followers);
  }

  getFollowers(): Observable<any[]> {
    return this.followers$;
  }

  // Methods to update friends
  setFriends(friends: any[]): void {
    this.friendsSubject.next(friends);
  }

  getFriends(): Observable<any[]> {
    return this.friends$;
  }

  //Methos to update selectedUser
  setSelectedUser(user:any){
    this.selectedUserSubject.next(user);
  }

  getSelecteduser():Observable<any>{
    return this.selectedUser$;
  }
}
