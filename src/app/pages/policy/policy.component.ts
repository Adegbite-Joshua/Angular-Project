import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss'
})
export class PolicyComponent {
  public email:string = "adegbitejoshua07@gmail.com"
}
