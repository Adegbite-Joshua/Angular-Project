import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.user = this.data.user;
    this.bookings = this.data.bookings;
  }
}
