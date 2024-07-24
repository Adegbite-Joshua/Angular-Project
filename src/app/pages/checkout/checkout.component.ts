import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoomsService } from '../../services/rooms/rooms.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, StarRatingComponent, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  // constructor( ) {}
  constructor(private roomsService: RoomsService, private activatedRoute: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as {
        checkInDate: string;
        checkOutDate: string;
      };

      this.checkInDate = state.checkInDate
      this.checkOutDate = state.checkOutDate

      console.log('Check-In Date:', state.checkInDate);
      console.log('Check-Out Date:', state.checkOutDate);
    } else {
      console.log("No state");
      this.router.navigate(['rooms/all'])
    }
  }

  roomId = ""
  checkInDate = ""
  checkOutDate = ""

  room = <any>{}

  ngOnInit() {
    this.roomId = this.activatedRoute.snapshot.params['id'];

    if (!this.roomId) {
      console.log("No id");
      
      this.router.navigate(['rooms/all'])
    } else if (!this.checkInDate || !this.checkOutDate) {
      this.router.navigate([`rooms/${this.roomId}`])
    }

    this.loadRooms();
  }

  loadRooms(): void {
    this.room = this.roomsService.getRoomDetails(this.roomId)
  }

  calculateNights(): number {
    const newCheckInDate = new Date(this.checkInDate);
    const newCheckOutDate = new Date(this.checkOutDate);
    const timeDifference = newCheckOutDate.getTime() - newCheckInDate.getTime();
    return timeDifference / (1000 * 3600 * 24);
  }
}
