import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/admin/auth/auth.service';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  otp: string = '';
  isOtpSent: boolean = false;
  isLoading: boolean = false;
  isVerifying: boolean = false;
  countdown: number = 0;

  constructor(
    private adminAuthService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async login() {
    this.isLoading = true;
    await this.adminAuthService.login(this.email, this.password).then((response) => {
      this.isOtpSent = true;
      this.isLoading = false;
      this.toastr.success('OTP sent to your email');
    }).catch((error) => {
      this.isLoading = false;
      this.toastr.error('Login failed');
    });
  }


  requestNewOtp() {
    if (this.countdown === 0) {
      this.login();
    }
  }

  verifyOtp() {
    this.isVerifying = true;
    this.adminAuthService.verifyOtp(this.email, this.otp).then((response) => {
      this.adminAuthService.setAdminDetails(response.data);
      this.isVerifying = false;
      this.router.navigate(['/admin/dashboard']); 
      Cookies.set('admin_token', response.data.data.token, { expires: 7 });
      this.adminAuthService.changeLoginStatus(true);
      this.adminAuthService.setAdminDetails(response.data.data.admin)
      this.toastr.success('Login Successfully');
    }).catch((error) => {
      this.toastr.error('OTP verification failed');
    });
  }

  resetCredentials() {
    this.email = '';
    this.password = '';
    this.otp = '';
    this.isOtpSent = false;
  }

  startCountdown() {
    this.countdown = 60; // 60 seconds countdown
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Decrease by 1 every second
  }

}
