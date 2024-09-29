import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../../services/rooms/rooms.service';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { DashboardDialogComponent } from '../../components/dashboard-dialog/dashboard-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

interface Room {
  number: number;
  id: string;
  price: number;
  rating: number;
  name: string;
  description: string;
  category: string;
  images: string[];
  availableFrom: Date;
  availableTo: Date;
}

@Component({
  selector: 'app-all-rooms',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GeneralNavbarComponent,
    FooterComponent,
    StarRatingComponent,
    RouterLink
  ],
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss']
})
export class AllRoomsComponent implements OnInit {
  filterForm!: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];
  categories: string[] = ['Single', 'Double', 'Suite'];
  rooms: Room[] = [];
  filteredRooms: Room[] = [];

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.filterForm = this.fb.group({
      rating: [null],
      category: [null],
      checkinDate: [null],
      checkoutDate: [null]
    });
  }

  ngOnInit(): void {
    this.loadRooms();
    const navigation = this.router.getCurrentNavigation();

    this.route.queryParams.subscribe(params => {
      if (params['in']) {
        this.filterForm.patchValue({ checkinDate: new Date(params['in']) });
      }
      if (params['out']) {
        this.filterForm.patchValue({ checkoutDate: new Date(params['out']) });
      }
      if (params['type']) {
        this.filterForm.patchValue({ category: params['type'] });
      }
      if (params['code'] == 'successful' && this.authService.checkLogin()) {     
        this.toastr.success('Booking payment successful', 'Successful')   
        this.dialog.open(DashboardDialogComponent, {
          width: "90%",
          height: "90%",
          panelClass: 'justify-center',
          // justifyContent: 'center',
          // padding: "20px",
        });
      }

      this.router.navigate([], {
        queryParams: {},
        replaceUrl: true
      });
    });
}

lovedThisRoom(roomId: string){
  const lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
  return lovedRooms?.includes(roomId);
}

numberOfLovedRooms(){
  const lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
  return lovedRooms.length;
}

loveRoom(roomId: string){
  let lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
  const isNewRoom = !lovedRooms?.includes(roomId);
  if (isNewRoom) {
    lovedRooms.push(roomId);
  } else {
    lovedRooms = lovedRooms.filter(room => room !== roomId);
  }
  localStorage.setItem('lovedRooms', JSON.stringify(lovedRooms));
}

applyLovedRoomsFilter(){
  let lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
  this.filteredRooms = this.filteredRooms.filter(room => lovedRooms.includes(room.id));
}

applyFilters(filters: any, rooms: any[]): void {
  this.filteredRooms = rooms.filter(room => {
    const matchesRating = filters.rating === null || filters.rating === undefined || room.rating === filters.rating;

    const matchesCategory = filters.category === 'all' || filters.category === null || filters.category === undefined || room.category === filters.category;

    const normalizeDate = (date: any) => {
      if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      return date;
    };

    const matchesCheckinDate = !filters.checkinDate || !filters.checkoutDate ||
      this.roomsService.isRoomAvailable(room, normalizeDate(filters.checkinDate), normalizeDate(filters.checkoutDate));
    return matchesRating && matchesCategory && matchesCheckinDate;
  });
}






loadRooms(): void {
  this.roomsService.getRooms().subscribe(rooms => {
    this.rooms = rooms;
    console.log(rooms);

    this.applyFilters(this.filterForm.value, this.rooms);

    this.filterForm.valueChanges.subscribe(filters => {

      this.applyFilters(filters, this.rooms);
    });
  });
}




resetFilters(): void {
  this.filterForm.reset({
    rating: null,
    category: null,
    checkinDate: null,
    checkoutDate: null
  });
}

formatLabel(value: number): string {
  return `$${value}`;
}

}
