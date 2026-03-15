import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { APIService } from '../../service/apiservice';
@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.html',
  styleUrl: './left-panel.css',
})
export class LeftPanel {
  constructor(private apiService:APIService){}
  followUser(userId: any) {
    this.apiService.followUser(1,userId).subscribe(
      (data)=>{console.log('Followed user successfully');},
      (error)=>{console.error('Error following user:', error);}
    )
  }
  @Input() users: any[] = [];
}
