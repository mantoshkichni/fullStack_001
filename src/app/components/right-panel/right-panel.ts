import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  imports: [],
  templateUrl: './right-panel.html',
  styleUrl: './right-panel.css',
})
export class RightPanel implements AfterViewInit {
   public bootstrap:any;
  ngAfterViewInit(){
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new this.bootstrap.Popover(popoverTriggerEl)
    })
  }
}
