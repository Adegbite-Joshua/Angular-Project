import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-room',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, MatGridListModule, StarRatingComponent, CommonModule, RouterLink],
  templateUrl: './view-room.component.html',
  styleUrl: './view-room.component.scss'
})
export class ViewRoomComponent {
  constructor (public activatedRoute: ActivatedRoute) {}

  room = {
    number: 101,
    name: "Luxury Single Room",
    description: "A luxurious single room with modern amenities and a beautiful city view.",
    price: 100,
    rating: 5,
    category: 'Single',
    images: ['assets/1.jpg', 'assets/2.jpg', 'assets/1.jpg', 'assets/2.jpg']
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id']);
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  getGridCols(length: number): number {
    switch (length) {
      case 2:
        return 2;
      case 3:
      case 4:
        return 2;
      case 5:
        return 3;
      default:
        return 1;
    }
  }

  getColSpan(length: number, index: number): number {
    if (length === 3) {
      return index < 2 ? 1 : 2;
    }
    if (length === 5) {
      return index === 0 ? 2 : 1;
    }
    return 1;
  }

  getRowSpan(length: number, index: number): number {
    if (length === 5 && index === 0) {
      return 2;
    }
    return 1;
  }
}
