import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { RoomsService } from '../../services/rooms/rooms.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInSignUpDialogComponent } from '../../components/sign-in-sign-up-dialog/sign-in-sign-up-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, StarRatingComponent, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  isUserLoggedIn: boolean = false;

  constructor(private roomsService: RoomsService, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService, private dialog: MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as {
        checkInDate: string;
        checkOutDate: string;
      };

      this.checkInDate = state.checkInDate
      this.checkOutDate = state.checkOutDate

      this.isUserLoggedIn  = authService.checkLogin() as boolean;
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
      this.router.navigate(['rooms/all'])
    } else if (!this.checkInDate || !this.checkOutDate) {
      this.router.navigate([`rooms/${this.roomId}`])
    }

    this.loadRooms();
  }

  async loadRooms(): Promise<void> {
    this.room = await this.roomsService.getRoomDetails(this.roomId);
    console.log(this.room);
    
  }

  calculateNights(): number {
    const newCheckInDate = new Date(this.checkInDate);
    const newCheckOutDate = new Date(this.checkOutDate);
    const timeDifference = newCheckOutDate.getTime() - newCheckInDate.getTime();
    return timeDifference / (1000 * 3600 * 24);
  }

  openLoginSignupDialog(): void {
    this.dialog.open(SignInSignUpDialogComponent, {     
      // panelClass: 'bg-white p-6 rounded-lg shadow-lg max-w-md'
    });  }
}
