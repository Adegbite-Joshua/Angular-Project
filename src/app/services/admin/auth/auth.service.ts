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
  public adminDetails = new BehaviorSubject<any>({
    first_name: 'John',
    last_name: 'Doe',
    email: 'johndoe@example.com',
    password: 'hhb',
    telephone: '123-456-7890',
    gender: 'Male',
    role: 'User',
    nin_number: 'AB123456',
    city: 'New York',
    zip_code: '10001',
    address: '123 Main St'
  });
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
    Cookies.remove('admin_token');
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
