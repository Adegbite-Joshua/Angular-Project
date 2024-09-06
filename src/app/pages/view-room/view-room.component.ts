import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RoomsService } from '../../services/rooms/rooms.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, MatGridListModule, StarRatingComponent, CommonModule, RouterLink, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {
  selectDateForm: FormGroup;
  isBrowser: boolean = false;

  constructor(private fb: FormBuilder, private roomsService: RoomsService, private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.selectDateForm = this.fb.group({
      checkinDate: [null, Validators.required],
      checkoutDate: [null, Validators.required]
    });
    this.isBrowser = isPlatformBrowser(this.platformId);  // Check if it's the browser
  }

  roomId: string = ""

  room = <any>{}

  categoryRooms = <any>[];

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.loadRooms();
  }

  async loadRooms(): Promise<void> {
    console.log(await this.roomsService.getRoomDetails(this.roomId));
    
    this.room = await this.roomsService.getRoomDetails(this.roomId)

    this.categoryRooms = this.roomsService.getCategoryRooms(this.room?.category, this.room?.id)
  }

  bookRoom() {
    if (this.selectDateForm.invalid) {
      this.toastr.info('Dates required');
      return;
    }
    this.router.navigate([`rooms/${this.roomId}/checkout`], {
      state: {
        checkInDate: this.selectDateForm.controls['checkinDate'].value,
        checkOutDate: this.selectDateForm.controls['checkoutDate'].value,
      }
    });
  }


  trackByFn(index: number, item: any): any {
    return index;
  }

  getGridCols(length: number): number {
    switch (length) {
      case 2:
        return 2;
      case 3:
      case 4:
        return 2;
      case 5:
        return 3;
      default:
        return 1;
    }
  }

  getColSpan(length: number, index: number): number {
    if (length === 3) {
      return index < 2 ? 1 : 2;
    }
    if (length === 5) {
      return index === 0 ? 2 : 1;
    }
    return 1;
  }

  getRowSpan(length: number, index: number): number {
    if (length === 5 && index === 0) {
      return 2;
    }
    return 1;
  }

  toggleLoveRoom(roomId: string) {
    this.loveRoom(roomId); // Update the loved status in localStorage
  }

  lovedThisRoom(roomId: string) {
    if (!this.isBrowser) return;
    const lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
    return lovedRooms.includes(roomId);
  }

  loveRoom(roomId: string) {
    if (!this.isBrowser) return;
    let lovedRooms: string[] = localStorage.getItem('lovedRooms') ? JSON.parse(localStorage.getItem('lovedRooms') as string) : [];
    const isNewRoom = !lovedRooms.includes(roomId);
    if (isNewRoom) {
      lovedRooms.push(roomId);
    } else {
      lovedRooms = lovedRooms.filter(room => room !== roomId);
    }
    localStorage.setItem('lovedRooms', JSON.stringify(lovedRooms));
  }

}
