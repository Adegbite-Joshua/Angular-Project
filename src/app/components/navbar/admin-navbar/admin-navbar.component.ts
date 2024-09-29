import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/admin/auth/auth.service';


@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent {
  isLoggedIn: boolean = false;

  constructor (private authSevice: AuthService) {
    this.isLoggedIn = authSevice.checkLogin();
    console.log(authSevice.checkLogin());
    console.log(this.isLoggedIn);
    
  }
}
