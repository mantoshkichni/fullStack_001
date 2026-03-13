import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  @Output() categorySelected = new EventEmitter<string>();
  @Output() searchValueChanged = new EventEmitter<string>();
  @Input() currentUser: any;
  public searchValue!: string;
  selectCategory(category: string) {
    console.log('Selected category:', category);
    this.categorySelected.emit(category);
  }
  getSearchResults() {
    console.log('Search value:', this.searchValue);
    this.searchValueChanged.emit(this.searchValue);
  }

}

