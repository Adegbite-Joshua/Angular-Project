// auth.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../../constants/server';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userdetails = new BehaviorSubject<any|null >(null);
  
  constructor() {}

  // Method to check if the user is authenticated
  checkLogin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  async getUserDetails() {
    try {
      axios.get(`${serverUrl}/api/user/details`, {
        headers: { Authorization: `Bearer ${localStorage['token']}` },
      })
    } catch (error) {
      console.log(error);
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
}
