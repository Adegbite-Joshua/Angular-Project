import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { RoomComponent } from '../../components/rooms/room/room.component';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [GeneralNavbarComponent, RoomComponent, FooterComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
}
