import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response-module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean = true;
  loading: boolean = false;
  error: string = "";

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleAuth(form: NgForm) {
    if(!form.valid) {
      return
    }

    this.loading = true

    const email = form.value.email;
    const password = form.value.password;
    let authResponse: Observable<AuthResponse>

    if(this.isLoginMode) {
      authResponse = this.authService.login(email, password)
    } else {
      authResponse = this.authService.register(email, password)
    }

    authResponse.subscribe({
      next:() => {
        this.loading = false;
        this.error = "";
        this.router.navigate(['/'])
      },
      error:(err) => {
        this.loading = false;
        this.error = err;
      }
    })

  }


}
