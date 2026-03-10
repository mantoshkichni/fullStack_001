import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/UserDto';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private apiUrl = 'http://localhost:8080/api'; 
  constructor(private http: HttpClient) { }

  saveUser(data: User) {
    return this.http.post(`${this.apiUrl}/saveUser`, data);
  }

  userLogin(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

}
