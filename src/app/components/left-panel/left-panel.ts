import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";
@Component({
  selector: 'app-left-panel',
  imports: [CommonModule],
  templateUrl: './left-panel.html',
  styleUrl: './left-panel.css',
})
export class LeftPanel {
  @Input() users: any[] = [];
}
