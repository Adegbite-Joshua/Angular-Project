import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public email = "adegbitejoshua07@gmail.com"
}
