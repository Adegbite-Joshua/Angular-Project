import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-dialog',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButton, MatButtonModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.scss'
})
export class DashboardDialogComponent {
  user: any;
  bookings: any[] = [];
  displayedColumns: string[] = ['room', 'checkIn', 'checkOut', 'ref'];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserDetails()
  }

  async getUserDetails() {
    this.authService.getUserDetails();
    this.authService.userdetails.subscribe( details => {
      this.user = details;
      if (details) {
        this.bookings = details.bookings || [];
      } else {
        this.bookings = [];
      }
    })
  } 

  downloadBooking(booking: any) {
    const bookingData = `
      Room: ${booking.room}${Math.floor(Math.round(5)*100)}\n
      Check-In Date: ${booking?.check_in_date}\n
      Check-Out Date: ${booking?.check_out_date}\n
    `;

    // Create a Blob object representing the data as a text file
    const blob = new Blob([bookingData], { type: 'text/plain' });
    
    // Create a download link
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `booking_${booking.room}.txt`;

    // Automatically trigger the download
    link.click();
  }
}
