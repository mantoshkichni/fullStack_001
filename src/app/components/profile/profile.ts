import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIService } from '../../service/apiservice';
import { Header } from "../header/header";
import { SharedService } from '../../service/shared.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, Header],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit, OnDestroy {


  public currentUser: any;
  private subscription!: Subscription;

  constructor(private apiService: APIService, private sharedService: SharedService, private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.sharedService.getProfileUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navigateToMessage(currentUser: any) {
    this.sharedService.setSelectedUser(currentUser);
    this.router.navigate(['/message'])
  }

}
