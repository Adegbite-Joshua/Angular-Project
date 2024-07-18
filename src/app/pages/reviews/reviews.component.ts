import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { ReviewsService } from '../../services/reviews/reviews.service';


@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews = <any>[];

  constructor (private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.reviewsService.getReviews().subscribe(reviews => {
      this.reviews = reviews
    });
  }

}
