import { Injectable } from '@angular/core';
import { API_URLS } from '../../Shared/constants/apiurls.constant';
import { ApiService } from '../../Shared/ApiService/api.service';
import { LoginModel } from '../../Shared/Models/login.model';
import { Observable } from 'rxjs';
import { RegisterModel } from '../../Shared/Models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginEndpoint = API_URLS.loginUrl;
  private readonly registerEndpoint = API_URLS.registerUrl;

  constructor(private apiService: ApiService) { }

  login(loginModel: LoginModel): Observable<any> {
    console.log("url",this.loginEndpoint)
    return this.apiService.postData(this.loginEndpoint, loginModel);
  }

  register(registerModel: RegisterModel): Observable<any> {
    console.log("registerurl",this.registerEndpoint)
    return this.apiService.postData(this.registerEndpoint, registerModel);
  }
  
  // logout(): Observable<any> {
  //   return this.apiService.postData(this.logoutEndpoint, {});
  // }
  
}
