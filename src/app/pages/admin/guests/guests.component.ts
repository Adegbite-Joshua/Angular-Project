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
  displayedColumns: string[] = ['id', 'name', 'roomNumber', 'totalAmount', 'amountPaid', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private guestService: GuestsService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests() {
    const guests = this.guestService.getGuests();
    this.dataSource.data = guests;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkIn(id: number) {
    this.guestService.checkIn(id);
    this.loadGuests();
  }

  checkOut(id: number) {
    this.guestService.checkOut(id);
    this.loadGuests();
  }

  searchByRoomNumber(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filteredGuests = this.guestService.searchGuests(filterValue);
    this.dataSource.data = filteredGuests;
  }
}
