import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './Component/login/login.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './Component/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    RouterModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
})
export class AuthModule { }
