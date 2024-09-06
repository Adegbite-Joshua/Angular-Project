import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardDialogComponent } from '../../dashboard-dialog/dashboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth/auth.service';
import { SignInSignUpDialogComponent } from '../../sign-in-sign-up-dialog/sign-in-sign-up-dialog.component';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.scss'
})
export class GeneralNavbarComponent {
  toggle_nav_bar(e: any){
    if (e.target.id == 'nav_bar') {
      document.getElementById('nav_bar')?.classList.toggle('responsive')
    }
  }

  constructor(private dialog: MatDialog, private authService: AuthService) {}

  openDashboard(): void {
    if (this.authService.checkLogin()) {
      // Assuming you fetch user details and bookings from a service
      const user = { name: 'John Doe', email: 'john@example.com' };
      const bookings = [
        { room: '101', checkInDate: '2024-07-01', checkOutDate: '2024-07-05' },
        { room: '202', checkInDate: '2024-08-01', checkOutDate: '2024-08-10' },
      ];

      this.dialog.open(DashboardDialogComponent, {
        data: { user, bookings },
      });
    } else {
      this.openLoginSignupDialog();
    }
  }

  openLoginSignupDialog(): void {
    this.dialog.open(SignInSignUpDialogComponent);
  }
}
