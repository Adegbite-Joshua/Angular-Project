// auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../../constants/server';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userdetails = new BehaviorSubject<any>(null);

  constructor() { }

  // Method to check if the user is authenticated
  checkLogin(): boolean {
    const token = Cookies.get('token');
    if (token) {
      this.isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  async getUserDetails() {
    try {
      if (this.userdetails.value) {
        return this.userdetails.asObservable();
      }
      
      const response = await axios.get(`${serverUrl}/api/user/details`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
  
      return response?.data?.data || {};  // Return data or an empty object if undefined
    } catch (error) {
      console.error("Error fetching user details:", error);
      return {};  // Return an empty object on error
    }
  }
  

  setUserDetails(value: any) {
    this.userdetails.next(value);
  }

  login(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  getLoginStatus() {
    return this.isLoggedIn.asObservable();
  }

  changeLoginStatus(value: boolean) {
    return this.isLoggedIn.next(value);
  }
}
