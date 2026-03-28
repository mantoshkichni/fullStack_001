import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../../service/apiservice';
import { SharedService } from '../../service/shared.service';
import { LoginResponse } from '../../model/loginResponse';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor( private router: Router, private apiService:APIService, private sharedService:SharedService,){}
onSubmit() {
  this.apiService.userLogin(this.userLoginData.value).subscribe({
    next:(response)=>{
      console.log(response);
      this.sharedService.setCurrentUser(response.user);
      this.router.navigate(['/home']);
      // this.sharedService.setCurrentUser(response.user)
    },
    error:(error)=>{
      console.log(error);
      alert(error)
      this.router.navigate(['/landingPage']);
    }
  });
}
 userLoginData=new FormGroup({
  email:new FormControl('', Validators.required),
  password:new FormControl('', Validators.required)
 })
}
