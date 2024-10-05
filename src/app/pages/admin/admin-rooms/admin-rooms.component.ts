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
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionDialogComponent } from '../../../components/admin/admin-rooms/action-dialog/action-dialog.component';
import axios from 'axios';
import { serverUrl } from '../../../constants/server';
import { ToastrService } from 'ngx-toastr';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';

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
    MatDialogModule,
    MatDatepicker,
    MatInputModule,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './admin-rooms.component.html',
  styleUrls: ['./admin-rooms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRoomsComponent {
  displayedColumns: string[] = ['id', 'type', 'floor', 'facilities', 'status', 'occupied', 'check_in_date', 'check_out_date', 'actions'];
  dataSource = new MatTableDataSource<any>();
  filter = 'all';

  check_in_date!: string;
  check_out_date!: string;
  selectedCategory = 'all';
  roomCategories: string[] = ['Single', 'Double', 'Suite', 'VIP'];

  allCount!: number;
  availableCount!: number;
  bookedCount!: number;
  rooms: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private roomService: RoomsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.roomForm = this.fb.group({
      number: ['', Validators.required],
      bed_type: ['', Validators.required],
      floor: ['', Validators.required],
      facility: ['', Validators.required],
      status: ['', Validators.required],
      category: ['', Validators.required]
    });

    roomService.rooms.subscribe(rooms => {
      this.dataSource.data = rooms.reverse();
      console.log(rooms);

      this.rooms = rooms;
      this.loadRooms()
    })
  }

  today: Date = new Date();

  filterYesterdayDates = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate());

    if (d) {
      return d >= yesterday;
    }

    return true;
  };

  filterTodayDates = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (d) {
      return d > today;
    }

    return true;
  };

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  async loadRooms(): Promise<void> {
    this.allCount = this.rooms.length;
    this.availableCount = this.rooms.filter(room => room?.booking_status.toLowerCase() === 'available').length;
    this.bookedCount = this.rooms.filter(room => room?.booking_status.toLowerCase() === 'booked').length;
    this.dataSource.data = this.rooms;
  }

  filterRooms(): void {
    this.roomService.getRooms().pipe(
      map(rooms => {
        let filteredRooms = rooms;

        if (this.check_in_date && this.check_out_date) {
          filteredRooms = filteredRooms.filter(room => this.roomService.isRoomAvailable(room, this.check_in_date, this.check_out_date));
        }

        if (this.selectedCategory !== 'all') {
          filteredRooms = filteredRooms.filter(room => room?.category === this.selectedCategory);
        }

        return filteredRooms;
      })
    ).subscribe(filteredRooms => {
      this.dataSource.data = filteredRooms;
      this.dataSource.paginator = this.paginator;
      // this.check_in_date = '';
      // this.check_out_date = '';
      // this.selectedCategory = 'all';
    });
  }

  resetFilter(): void {
    this.check_in_date = '';
    this.check_out_date = '';
    this.selectedCategory = 'all';
    this.filter = 'all';

    this.roomService.getRooms().subscribe(rooms => {
      this.dataSource.data = rooms.reverse();
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
        this.dataSource.data = rooms.reverse();
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.roomService.getRooms().subscribe(rooms => {
        this.dataSource.data = rooms.reverse().filter(room => room?.booking_status.toLowerCase() === this.filter);
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
        axios.delete(`${serverUrl}/api/admin/rooms/${room?.id}`)
          .then(response => {
            this.toastr.success('Room deleted successfully', 'Success!')
            this.roomService.deleteRoom(room?.id).subscribe(() => {
              this.loadRooms();
            });
          })
          .catch(error => {
            this.toastr.error('Something went wrong, please try again', 'Error')
          })
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



    bookDialog.afterClosed().subscribe(values => {
      if (!this.check_in_date || !this.check_out_date) {
        this.toastr.info('Please fill in the check in and out date')
      }
      if (values.email) {
        const check_in_date = new Date(this.check_in_date).toISOString().split('T')[0];
        const check_out_date = new Date(this.check_out_date).toISOString().split('T')[0];
        axios.post(`${serverUrl}/api/admin/create-booking`, {
          'email': values.email,
          'amount': values.amount,
          'roomId': room.id,
          'check_in_date': check_in_date,
          'check_out_date': check_out_date
        })
        .then( response => {
          this.roomService.bookRoom(room?.id, values.email).subscribe(updatedRoom => {
            this.loadRooms();
          });
          this.toastr.success('Room booked successfully', 'Success')
        })
        .catch( error => {
          console.log(error);
          if (error.response.data.error) {
            this.toastr.error(error.response.data.error, 'Error');
          } else {
            this.toastr.error("Something went wrong", 'Error');
          }
        })
      }
    });
  }

  roomForm!: FormGroup;
}
