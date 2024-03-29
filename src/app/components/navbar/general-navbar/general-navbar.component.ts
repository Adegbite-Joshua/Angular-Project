import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.scss'
})
export class GeneralNavbarComponent {

}
