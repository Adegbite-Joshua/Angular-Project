import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/auth/auth.service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  downloadingReceipt: boolean = false;
  currentBookingIndex = 0;
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

  downloadBooking(id: any) {
    this.downloadingReceipt = true;
    this.currentBookingIndex = id;    
    this.downloadReceipt();
  }


  downloadReceipt() {
    const element = document.getElementById('receipt') as HTMLElement; // Get the entire page content
    const originalWidth = element.clientWidth; // Save the original width
    if (!element) {
      console.error('Receipt element not found');
      return;
    }
    
    element.style.display = 'block';
        
    element.style.width = '1200px'; 

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('hotelhub-receipt.pdf');

      element.style.display = 'none';
      this.downloadingReceipt = false;

      element.style.width = `${originalWidth}px`;
    });
  }
}
