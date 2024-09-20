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

  constructor() { }

  checkLogin(): boolean {
    const token = Cookies.get('admin_token');
    if (token) {
      this.isLoggedIn.next(true);
      return true;
      // return this.isLoggedIn.asObservable();
    }
    return false;
    // return this.isLoggedIn.asObservable();
  }

  async getAdminDetails() {
    try {
      if (this.adminDetails.value) {
        return this.adminDetails.asObservable();
      }
      
      const response = await axios.get(`${serverUrl}/api/admin/details`, {
        headers: { Authorization: `Bearer ${Cookies.get('admin_token')}` },
      });
  
      return response?.data?.data || {};  // Return data or an empty object if undefined
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};
    }
  }
  

  setUserDetails(value: any) {
    this.adminDetails.next(value);
  }

  login(token: string): void {
    this.isLoggedIn.next(true);
  }

  logout(): void {
    this.isLoggedIn.next(false);
  }

  getLoginStatus() {
    return this.isLoggedIn.asObservable();
  }

  changeLoginStatus(value: boolean) {
    return this.isLoggedIn.next(value);
  }
}
