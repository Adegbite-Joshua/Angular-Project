import { Component, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
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
import { DialogComponent } from '../../../components/admin/admin-rooms/dialog/dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionDialogComponent } from '../../../components/admin/admin-rooms/action-dialog/action-dialog.component';

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
  styleUrls: ['./admin-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRoomsComponent {
  displayedColumns: string[] = ['number', 'bedType', 'floor', 'facility', 'status', 'occupied', 'checkInDate', 'checkOutDate', 'actions'];
  dataSource = new MatTableDataSource<any>();
  filter = 'all';

  checkInDate!: string;
  checkOutDate!: string;
  selectedCategory = 'all';
  roomCategories: string[] = ['Single', 'Double', 'Suite', 'VIP'];

  allCount!: number;
  availableCount!: number;
  bookedCount!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roomService: RoomsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
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
    this.roomService.getRooms().subscribe(rooms => {
      this.allCount = rooms.length;
      this.availableCount = rooms.filter(room => room.status.toLowerCase() === 'available').length;
      this.bookedCount = rooms.filter(room => room.status.toLowerCase() === 'booked').length;
      this.dataSource.data = rooms;
    });
  }

  filterRooms(): void {
    this.roomService.getRooms().pipe(
      map(rooms => {
        let filteredRooms = rooms;

        if (this.checkInDate && this.checkOutDate) {
          filteredRooms = filteredRooms.filter(room => this.roomService.isRoomAvailable(room, this.checkInDate, this.checkOutDate));
        }

        if (this.selectedCategory !== 'all') {
          filteredRooms = filteredRooms.filter(room => room.category === this.selectedCategory);
        }

        return filteredRooms;
      })
    ).subscribe(filteredRooms => {
      this.dataSource.data = filteredRooms;
      this.dataSource.paginator = this.paginator;
      this.checkInDate = '';
      this.checkOutDate = '';
      this.selectedCategory = 'all';
    });
  }

  resetFilter(): void {
    this.checkInDate = '';
    this.checkOutDate = '';
    this.selectedCategory = 'all';
    this.filter = 'all';

    this.roomService.getRooms().subscribe(rooms => {
      this.dataSource.data = rooms;
      this.dataSource.paginator = this.paginator;
    });
  }

  setFilter(filter: string): void {
    this.filter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filter === 'all') {
      this.roomService.getRooms().subscribe(rooms => {
        this.dataSource.data = rooms;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.roomService.getRooms().subscribe(rooms => {
        this.dataSource.data = rooms.filter(room => room.status.toLowerCase() === this.filter);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  confirmDelete(room: any): void {
    const confirmDialog = this.dialog.open(ActionDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this room?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.roomService.deleteRoom(room.number).subscribe(() => {
          this.loadRooms();
        });
      }
    });
  }

  bookRoom(room: any): void {
    const bookDialog = this.dialog.open(ActionDialogComponent, {
      data: {
        title: 'Book Room',
        message: 'Please enter your email address:',
        input: true
      }
    });

    bookDialog.afterClosed().subscribe(email => {
      if (email) {
        this.roomService.bookRoom(room.number, email).subscribe(updatedRoom => {
          this.loadRooms();
        });
      }
    });
  }

  roomForm!: FormGroup;
}
