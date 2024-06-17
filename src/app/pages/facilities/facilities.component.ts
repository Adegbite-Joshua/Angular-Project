import { Component } from '@angular/core';
import { FacilityCategoryComponent } from '../../components/facilities/facility-category/facility-category.component';
import { OurGalleryComponent } from '../../components/home/our-gallery/our-gallery.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';

@Component({
  selector: 'app-facilities',
  standalone: true,
  imports: [GeneralNavbarComponent, FacilityCategoryComponent],
  templateUrl: './facilities.component.html',
  styleUrl: './facilities.component.scss'
})
export class FacilitiesComponent {

}
