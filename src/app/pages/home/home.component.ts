import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutSectionComponent } from '../../components/home/about-section/about-section.component';
import { HeroSectionComponent } from '../../components/home/hero-section/hero-section.component';
import { OurGalleryComponent } from '../../components/home/our-gallery/our-gallery.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GeneralNavbarComponent, HeroSectionComponent, AboutSectionComponent, OurGalleryComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
