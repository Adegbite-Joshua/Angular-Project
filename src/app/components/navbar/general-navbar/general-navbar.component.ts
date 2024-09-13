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

  async openDashboard() {
    if (this.authService.checkLogin()) {   
      this.dialog.open(DashboardDialogComponent, {
        width: "90%",
        height: "90%",
        panelClass: 'justify-center',
        // justifyContent: 'center',
        // padding: "20px",
      });
    } else {
      this.openLoginSignupDialog();
    }
  }

  openLoginSignupDialog(): void {
    this.dialog.open(SignInSignUpDialogComponent, {     
      // panelClass: 'bg-white p-6 rounded-lg shadow-lg max-w-md'
    });  }
}
