import { Component, signal } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule , Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from './model/UserDto';

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true
})
export class App {
  protected readonly title = signal('newApp_004');
  
}
