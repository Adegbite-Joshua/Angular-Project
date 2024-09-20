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
import axios from 'axios';
import { serverUrl } from '../../constants/server';

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

    authService.isLoggedIn.subscribe( state => {
      this.isUserLoggedIn  = state;
    })
  }

  

  roomId = ""
  checkInDate = ""
  checkOutDate = ""

  room = <any>{};
  userDetails:any = this.authService.getUserDetails();

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

  calculateTotalFee(): number {
    let baseFare = this.room?.price * this.calculateNights();
    const discount = this.room?.discount || 10;
    baseFare = baseFare - (baseFare * (discount / 100));

    const tax = this.room?.price * (7 / 100)
    const service_fee = this.room?.service_fee;

    return (baseFare + tax + service_fee);
  }

  checkOut() {
    axios.post(`${serverUrl}/api/payment/initialize`, {
      email: this.userDetails.email,
      amount: this.calculateTotalFee(),
      roomId: this.roomId,
      check_in_date: this.checkInDate,
      check_out_date: this.checkOutDate
    })
    .then(response => {
      
    })
  }

  openLoginSignupDialog(): void {
    this.dialog.open(SignInSignUpDialogComponent, {     
      // panelClass: 'bg-white p-6 rounded-lg shadow-lg max-w-md'
    });  }
}
