import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneralNavbarComponent } from './components/navbar/general-navbar/general-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GeneralNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'level4-project';
}
