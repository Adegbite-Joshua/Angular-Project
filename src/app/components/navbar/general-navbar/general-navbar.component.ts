import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-general-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './general-navbar.component.html',
  styleUrl: './general-navbar.component.scss'
})
export class GeneralNavbarComponent {
  toggle_nav_bar(e: any){
    if (e.target.id == 'nav_bar') {
      document.getElementById('nav_bar')?.classList.toggle('responsive')
    }
  }

  
}
