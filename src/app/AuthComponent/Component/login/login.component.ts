import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../../../Shared/Models/login.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  model: LoginModel = new LoginModel();

  constructor(private authService: AuthService, private router: Router,private messageService: MessageService) {}
  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.model).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/secure/member']);
          this.authService.storeToken(response.token);  // Store the token
          
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: 'You have successfully logged in!'
          });
        },
        error: (error) => {
          console.error('Login failed:', error);

          if (error.status === 400) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Invalid Credentials',
              detail: 'Please check your email and password.'
            });
          } else if (error.status === 500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Server Error',
              detail: 'An error occurred. Please try again later.'
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Login Failed',
              detail: 'Something went wrong. Please try again.'
            });
          }
        }
      });
    }
  }
}
