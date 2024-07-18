import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { AboutSectionComponent } from '../../components/home/about-section/about-section.component';
import { HeroSectionComponent } from '../../components/home/hero-section/hero-section.component';
import { OurGalleryComponent } from '../../components/home/our-gallery/our-gallery.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { RouterLink } from '@angular/router';
import { ReviewsService } from '../../services/reviews/reviews.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GeneralNavbarComponent, CommonModule, HeroSectionComponent, AboutSectionComponent, OurGalleryComponent, FooterComponent, StarRatingComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  userRating: number = 3;
  isReadOnly: boolean = false;

  ngOnInit() {
    const userIsAdmin = true; 
    this.isReadOnly = !userIsAdmin;
    this.loadRooms();
  }

  onRatingChange(rating: number) {
    this.userRating = rating;
    console.log('New rating:', rating);
  }

  reviews = <any>[];

  constructor (private reviewsService: ReviewsService) {}

  loadRooms(): void {
    this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews
    });
  }
}
