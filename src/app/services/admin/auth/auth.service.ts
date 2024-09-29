// auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import Cookies from 'js-cookie';
import { serverUrl } from '../../../constants/server';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public adminDetails = new BehaviorSubject<any>(null);
  private otpSent = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  // Check if the user is already logged in (by checking the cookie)
  checkLogin(): boolean {
    const token = Cookies.get('admin_token');
    if (token) {
      this.isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  // Fetch admin details from the server
  async getAdminDetails() {
    try {
      if (this.adminDetails.value) {
        return this.adminDetails.asObservable();
      }

      const response = await axios.get(`${serverUrl}/api/admin/details`, {
        headers: { Authorization: `Bearer ${Cookies.get('admin_token')}` },
      });

      return response?.data?.data || {};
    } catch (error) {
      console.error('Error fetching user details:', error);
      return {};
    }
  }

  // Set admin details after login
  setUserDetails(value: any) {
    this.adminDetails.next(value);
  }

  // Login function with token (after OTP validation)
  login(email: string, password: string) {
    return axios.post(`${serverUrl}/api/admin/login`, { email, password });
  }

  // Logout admin and clear token
  logout() {
    Cookies.remove('adminToken');
    this.isLoggedIn.next(false);
    this.adminDetails.next(null);
  }

  // Get login status as an observable
  getLoginStatus() {
    return this.isLoggedIn.asObservable();
  }

  // Update login status
  changeLoginStatus(value: boolean) {
    return this.isLoggedIn.next(value);
  }

  // Send OTP to admin's email
  async sendOtp(email: string): Promise<void> {
    try {
      const response = await axios.post(`${serverUrl}/api/admin/send-otp`, { email });
      if (response.status === 200) {
        this.otpSent.next(true);
        console.log('OTP sent successfully');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  }

  // Validate the OTP entered by the admin
  async validateOtp(email: string, otp: string): Promise<boolean> {
    try {
      const response = await axios.post(`${serverUrl}/api/admin/verify-otp`, { email, otp });
      if (response.status === 200) {
        const { token } = response.data;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error validating OTP:', error);
      return false;
    }
  }

  // Track OTP sent state as an observable
  isOtpSent() {
    return this.otpSent.asObservable();
  }

  verifyOtp(email: string, otp: string) {
    return axios.post(`${serverUrl}/api/admin/verify-otp`, { email, otp });
  }

  setAdminDetails(details: any) {
    Cookies.set('adminToken', details.token);
    this.adminDetails.next(details);
    this.isLoggedIn.next(true);
  }

  

  isLoggedInStatus() {
    return this.isLoggedIn.asObservable();
  }

}
