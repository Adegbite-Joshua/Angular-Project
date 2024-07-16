import { Component, Inject, ViewChild } from '@angular/core';
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
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [AdminNavbarComponent, CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule ],
  templateUrl: './admin-rooms.component.html',
  styleUrl: './admin-rooms.component.scss'
})
export class AdminRoomsComponent {
  displayedColumns: string[] = ['number', 'bedType', 'floor', 'facility', 'status', 'occupied', 'checkInDate', 'checkOutDate'];
  dataSource = new MatTableDataSource<any>();
  filter = 'all';

  checkInDate!: string;
  checkOutDate!: string;
  selectedCategory = 'all';
  roomCategories: string[] = ['Single', 'Double', 'Triple', 'VIP'];

  allCount!: number;
  availableCount!: number;
  bookedCount!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roomService: RoomsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AdminRoomsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roomForm = this.fb.group({
      number: ['', Validators.required],
      bedType: ['', Validators.required],
      floor: ['', Validators.required],
      facility: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRooms();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadRooms(): void {
    const rooms = this.roomService.getRooms();
    this.allCount = rooms.length;
    this.availableCount = rooms.filter(room => room.status.toLowerCase() === 'available').length;
    this.bookedCount = rooms.filter(room => room.status.toLowerCase() === 'booked').length;

    this.dataSource.data = rooms;
  }

  filterRooms(): void {
    let filteredRooms = this.roomService.getRooms();

    if (this.checkInDate && this.checkOutDate) {
      filteredRooms = filteredRooms.filter(room => this.roomService.isRoomAvailable(room, this.checkInDate, this.checkOutDate));
    }

    if (this.selectedCategory !== 'all') {
      filteredRooms = filteredRooms.filter(room => room.category === this.selectedCategory);
    }

    this.dataSource.data = filteredRooms;
    this.dataSource.paginator = this.paginator;

    this.checkInDate = '';
    this.checkOutDate = '';
    this.selectedCategory = 'all';
  }


  setFilter(filter: string): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter === 'all') {
      this.dataSource.data = this.roomService.getRooms();
    } else {
      this.dataSource.data = this.roomService.getRooms().filter(room => room.status.toLowerCase() === this.filter);
    }
    this.dataSource.paginator = this.paginator;
  }

  addRoom() {
    const dialogRef = this.dialog.open(AdminRoomsComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.roomService.addRoom(result);
        this.updateCounts();
        this.applyFilter();
      }
    });
  }

  updateCounts() {
    const rooms = this.roomService.getRooms();
    this.allCount = rooms.length;
    this.availableCount = rooms.filter(room => room.status.toLowerCase() === 'available').length;
    this.bookedCount = rooms.filter(room => room.status.toLowerCase() === 'booked').length;
  }

  roomForm!: FormGroup;

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.dialogRef.close(this.roomForm.value);
    }
  }
}