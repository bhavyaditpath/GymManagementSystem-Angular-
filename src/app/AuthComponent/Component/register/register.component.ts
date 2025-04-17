import { Component } from '@angular/core';
import { RegisterModel } from '../../../Shared/Models/register.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  user: RegisterModel = new RegisterModel();
  passwordMismatch: boolean = false; // <-- Add this

  constructor(private authService: AuthService, private router: Router,private messageService: MessageService) { }

  onRegister(form: NgForm) {
    this.passwordMismatch = this.user.password !== this.user.confirmPassword;

    if (form.valid && !this.passwordMismatch) {
      this.authService.register(this.user).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Registration successful!'
          });
          form.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);

          if (error.status === 400) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Validation Error',
              detail: 'Email already exists'
            });
          } else if (error.status === 500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: error.error?.message || 'An unexpected server error occurred.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Something went wrong. Please try again.'
            });
          }
        }
      });
    }
  }
  
}




