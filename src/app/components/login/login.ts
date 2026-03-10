import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../service/apiservice';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor( private router: Router, private apiService:APIService){}
onSubmit() {
  this.apiService.userLogin(this.userLoginData.value).subscribe({
    next:(response)=>{
      this.router.navigate(['/home']);
    },
    error:(error)=>{
      console.log(error);
    }
  });
}
 userLoginData=new FormGroup({
  email:new FormControl('', Validators.required),
  password:new FormControl('', Validators.required)
 })
}
