import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  @Output() categorySelected = new EventEmitter<string>();
  selectCategory(category: string) {
    console.log('Selected category:', category);
    this.categorySelected.emit(category);
  }

}
