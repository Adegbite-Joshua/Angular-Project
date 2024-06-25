import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';

@Component({
  selector: 'app-all-rooms',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent],
  templateUrl: './all-rooms.component.html',
  styleUrl: './all-rooms.component.scss'
})
export class AllRoomsComponent {

}
