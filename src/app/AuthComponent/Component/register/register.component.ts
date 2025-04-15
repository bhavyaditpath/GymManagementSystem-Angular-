import { Component } from '@angular/core';
import { RegisterModel } from '../../../Shared/Models/register.model';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  registerForm: NgForm | undefined;
  // registerModel : RegisterModel[] = [];
  constructor(private authService: AuthService, private router: Router) { }
  model: RegisterModel = new RegisterModel();

  onRegister(form: NgForm) {
    if (form.valid && this.user.password === this.user.confirmPassword) {
      this.authService.register(this.user).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          form.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }
}



