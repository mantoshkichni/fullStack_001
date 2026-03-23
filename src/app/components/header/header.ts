import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIService } from '../../service/apiservice';
import { SharedService } from '../../service/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy{

  constructor(private apiservide:APIService, private sharedService: SharedService){}

  @Output() categorySelected = new EventEmitter<string>();
  @Output() searchValueChanged = new EventEmitter<string>();
  public currentUser: any;
  public searchValue!: string;
  public isactive: string='';
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.sharedService.getCurrentUser().subscribe(
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

  selectCategory(category: string) {
    console.log('Selected category:', category);
    this.isactive = category;
    this.categorySelected.emit(category);
  }
  getSearchResults() {
    console.log('Search value:', this.searchValue);
    this.searchValueChanged.emit(this.searchValue);
  }

}

