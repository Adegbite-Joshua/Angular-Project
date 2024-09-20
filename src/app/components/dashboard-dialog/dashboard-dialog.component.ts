import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard-dialog',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss'
})
export class DashboardDialogComponent {
  user: any;
  bookings: any[] = [];
  displayedColumns: string[] = ['room', 'checkIn', 'checkOut'];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.changeDetails();
  }

  async changeDetails() {
    this.user = await this.authService.getUserDetails();
    
    if (this.user) {
      console.log(this.user);
      this.bookings = this.user.bookings || [];
    } else {
      console.log("No user details found.");
      this.bookings = [];
    }
  } 
}
