import { Injectable } from '@angular/core';
import { API_URLS } from '../../Shared/constants/apiurls.constant';
import { ApiService } from '../../Shared/ApiService/api.service';
import { LoginModel } from '../../Shared/Models/login.model';
import { RegisterModel } from '../../Shared/Models/register.model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Import catchError
import { Router } from '@angular/router';     // To redirect after login

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginEndpoint = API_URLS.loginUrl;
  private readonly registerEndpoint = API_URLS.registerUrl;

  constructor(
    private apiService: ApiService,
    private router: Router   // To handle redirection after login
  ) { }

  // Login method with error handling and token storage
  login(loginModel: LoginModel): Observable<any> {
    console.log('URL:', this.loginEndpoint);
    return this.apiService.postData(this.loginEndpoint, loginModel).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        throw error; // or return a custom error observable
      })
    );
  }

  // Register method with error handling
  register(registerModel: RegisterModel): Observable<any> {
    console.log('Register URL:', this.registerEndpoint);
    return this.apiService.postData(this.registerEndpoint, registerModel).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        throw error; // Handle registration failure
      })
    );
  }

  // After login, you can store the token
  storeToken(token: string): void {
    localStorage.setItem('token', token); // Store token in localStorage
  }

}
