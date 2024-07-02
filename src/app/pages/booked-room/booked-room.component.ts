import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-booked-room',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent],
  templateUrl: './booked-room.component.html',
  styleUrl: './booked-room.component.scss'
})
export class BookedRoomComponent {

}
