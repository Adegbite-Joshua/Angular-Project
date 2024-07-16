import { Component, ViewChild } from '@angular/core';
import { RoomsService } from '../../../services/admin/rooms/rooms.service';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule],
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.scss'
})
export class AdminRoomsComponent {
  displayedColumns: string[] = ['number', 'bedType', 'floor', 'facility', 'status'];
  dataSource = new MatTableDataSource<any>();
  filter = 'all';

  allCount!: number;
  availableCount!: number;
  bookedCount!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private roomService: RoomsService) { }

  ngOnInit(): void {
    const rooms = this.roomService.getRooms();
    this.allCount = rooms.length;
    this.availableCount = rooms.filter(room => room.status.toLowerCase() === 'available').length;
    this.bookedCount = rooms.filter(room => room.status.toLowerCase() === 'booked').length;

    this.dataSource.data = rooms;
    this.applyFilter();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    if (this.filter === 'all') {
      this.dataSource.data = this.roomService.getRooms();
    } else {
      this.dataSource.data = this.roomService.getRooms().filter(room => room.status.toLowerCase() === this.filter);
    }
    this.dataSource.paginator = this.paginator;
  }

  setFilter(filter: string) {
    this.filter = filter;
    this.applyFilter();
  }
}
