import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';


@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [GeneralNavbarComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {

}
