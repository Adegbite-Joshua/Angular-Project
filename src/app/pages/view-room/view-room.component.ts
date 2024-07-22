import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../../services/rooms/rooms.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, MatGridListModule, StarRatingComponent, CommonModule, RouterLink, MatNativeDateModule, MatDatepickerModule,MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {
  selectDateForm: FormGroup
  constructor(private fb: FormBuilder, private roomsService: RoomsService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.selectDateForm = this.fb.group({
      checkinDate: [null, Validators.required],
      checkoutDate: [null, Validators.required]
    });
  }

  roomId:string = ""

  room = <any>{}

  categoryRooms = <any>[];

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.params['id'];
    this.loadRooms();
  }

  loadRooms(): void {
    this.room = this.roomsService.getRoomDetails(this.roomId)
    this.categoryRooms = this.roomsService.getCategoryRooms(this.room.category, this.room.id)
  }

  bookRoom() {
    if (this.selectDateForm.invalid) {
      alert('Dates required')
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
}
