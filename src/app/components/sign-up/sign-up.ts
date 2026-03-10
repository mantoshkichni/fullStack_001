import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { User } from '../../model/UserDto';
import { APIService } from '../../service/apiservice';
@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  userForm = new FormGroup({
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    currentCompany: new FormControl('', Validators.required),
    domain: new FormControl('', Validators.required),
    skills: new FormArray([])
  }, { validators: this.passwordMismatchValidator });
  domains: string[] = [
    "Software Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "DevOps",
    "Cloud Engineering",
    "Data Engineering",
    "Data Science / AI / ML",
    "Quality Assurance / Testing",
    "Cybersecurity",
    "Mobile App Development",
    "Product Management",
    "Project Management",
    "Business Analysis",
    "UI / UX Design",
    "Technical Support",
    "IT Infrastructure",
    "Database Administration",
    "Sales & Marketing",
    "Human Resources"
  ];
  skills: string[] = [
    "Java",
    "Spring Boot",
    "Microservices",
    "Angular",
    "React",
    "Node.js",
    "Python",
    "Machine Learning",
  ];

  constructor(private router: Router, private apiService: APIService) { }

   onSubmit() {
    if (this.userForm.valid) {
      // Handle form submission
      const userData = new User(
        this.userForm.value.name!,
        this.userForm.value.email!,
        this.userForm.value.password!,
        new Date(this.userForm.value.dob!),
        this.userForm.value.address!,
        this.userForm.value.currentCompany!,
        this.userForm.value.domain!,
        this.userForm.value.skills!
      )
        // Simulate API call
         this.apiService.saveUser(userData).subscribe({
           next: () => this.router.navigate(['/home']),
           error: (error) => alert('Error saving user: ' + error)
         });
      console.log(userData);
    }
  }

  onSkillChange($event: Event) {
    const checkbox = $event.target as HTMLInputElement;
    const skillsArray = this.userForm.get('skills') as FormArray;

    if (checkbox.checked) {
      skillsArray.push(new FormControl(checkbox.value));
    } else {
      const index = skillsArray.controls.findIndex(control => control.value === checkbox.value);
      if (index !== -1) {
        skillsArray.removeAt(index);
      }
    }
  }

 passwordMismatchValidator(control: AbstractControl){
  const password=control.get('password')?.value;
  const confirmPassword=control.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  } else {
    return { passwordMismatch: true };
  }
 }
}