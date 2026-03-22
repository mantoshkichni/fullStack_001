import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastMessage: string = '';
  isVisible: boolean = false;

  show(message: string) {
    this.toastMessage = message;
    this.isVisible = true;

    // auto hide after 3 sec
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  hide() {
    this.isVisible = false;
  }
}
