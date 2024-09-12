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
  private userdetails = new BehaviorSubject<any|null >(null);
  
  constructor() {}

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
      if (Object.keys(this.userdetails).length > 0) {
        return this.userdetails.asObservable();
      }
      axios.get(`${serverUrl}/api/user/details`, {
        headers: { Authorization: `Bearer ${localStorage['token']}` },
      })
      .then(response => {
        return response.data.data;
      })
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  // Method to toggle login state
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
