import { Component, NgModule, ViewChild } from '@angular/core';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GuestsService } from '../../../services/admin/guests/guests.service';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { serverUrl } from '../../../constants/server';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [AdminNavbarComponent, MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss'
})
export class GuestsComponent {
  displayedColumns: string[] = ['id', 'room', 'room_id', 'amount', 'amount', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private guestService: GuestsService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests() {
    this.guestService.getGuests();
    this.guestService.guests.subscribe(guests => {
      this.dataSource.data = guests;
      console.log(guests);
      
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkIn(id: number) {
    axios.patch(`${serverUrl}/api/admin/bookings/${id}`, {
      status: 'checked_in'
    }).then(response => {
      this.guestService.checkIn(id);
      this.toastr.success('Checked in successfully')
    })
    .catch( error => {
      this.toastr.error('Please try again', 'Error checking in');
    })
  }

  checkOut(id: number) {
    axios.patch(`${serverUrl}/api/admin/bookings/${id}`, {
      status: 'checked_out'
    }).then(response => {
      this.guestService.checkOut(id);
      this.toastr.success('Checked out successfully')
    })
    .catch( error => {
      this.toastr.error('Please try again', 'Error checking out');
    })
    // this.loadGuests();
  }

  searchByRoomNumber(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filteredGuests = this.guestService.searchGuests(filterValue);
    this.dataSource.data = filteredGuests;
  }
}
