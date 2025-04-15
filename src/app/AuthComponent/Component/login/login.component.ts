import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginModel } from '../../../Shared/Models/login.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {
  model: LoginModel = new LoginModel();

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.valid) {
      this.authService.login(this.model).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.router.navigate(['/secure/member']);
          this.authService.storeToken(response.token);  // Store the token
       
        },
        error: (error) => {
          console.error('Login failed:', error);
        }
      });
    }
  }
  
}
