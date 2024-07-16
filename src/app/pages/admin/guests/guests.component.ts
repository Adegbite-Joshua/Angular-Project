import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-guests',
  standalone: true,
  imports: [AdminNavbarComponent],
  templateUrl: './guests.component.html',
  styleUrl: './guests.component.scss'
})
export class GuestsComponent {

}
