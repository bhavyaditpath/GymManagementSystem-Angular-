import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RegisterModel } from '../../../Shared/Models/register.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule]
})

export class RegisterComponent {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  user: RegisterModel = new RegisterModel();
  registerForm: NgForm | undefined;
  // registerModel : RegisterModel[] = [];
  constructor(private authService: AuthService, private router: Router) { }
  model: RegisterModel = new RegisterModel();

  onRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const registerData: RegisterModel = form.value;

    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register(registerData).subscribe({
      next: (res) => {
        console.log('Registration successful:', res);
        alert('Registration successful');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed: ' + (err.error?.message || 'Unknown error'));
      }
    });
  }
}



