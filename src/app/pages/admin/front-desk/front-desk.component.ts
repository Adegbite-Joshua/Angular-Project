import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';
import { FrontDeskService } from '../../../services/admin/front-desk/front-desk.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-front-desk',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule],
  templateUrl: './front-desk.component.html',
  styleUrl: './front-desk.component.scss'
})
export class FrontDeskComponent {
  bookings = <any>[];
  filter = 'all';
  months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  selectedMonth!: string;
  days = <any>[];
  daysInMonth!: number;

  constructor(private bookingService: FrontDeskService) { }

  ngOnInit(): void {
    this.bookings = this.bookingService.getBookings();
  }

  selectMonth(month: string) {
    this.selectedMonth = month;
    this.daysInMonth = new Date(2023, this.months.indexOf(month) + 1, 0).getDate();
    this.days = Array.from({ length: this.daysInMonth }, (_, i) => i + 1);
  }

  applyFilter(filter: string) {
    this.filter = filter;
    if (filter === 'all') {
      this.bookings = this.bookingService.getBookings();
    } else {
      this.bookings = this.bookingService.getBookings().filter(booking => booking.status === filter);
    }
  }

  getColumnStart(date: Date): number {
    const startDate = new Date(date);
    return startDate.getDate();
  }

  getColumnEnd(date: Date): number {
    const endDate = new Date(date);
    return endDate.getDate() + 1;
  }

  isBookingInMonth(booking:any, month:any): boolean {
    const bookingStartDate = new Date(booking.startDate);
    const bookingEndDate = new Date(booking.endDate);
    const selectedMonthIndex = this.months.indexOf(month);
    return bookingStartDate.getMonth() === selectedMonthIndex || bookingEndDate.getMonth() === selectedMonthIndex;
  }
  
}
