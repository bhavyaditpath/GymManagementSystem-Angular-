import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LoginModel } from '../../../Shared/Models/login.model';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule]
})
export class LoginComponent {
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const loginData: LoginModel = form.value;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        alert('Login successful');
        this.router.navigate(['/member']);
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}
