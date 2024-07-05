import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';

interface Review {
  score: number;
  reviewer: string;
  text: string;
  image: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, CommonModule, RouterLink, StarRatingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  reviews: Review[] = [
    { image: "assets/1.jpg", score: 5.0, reviewer: 'Omar Siphron', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { image: "assets/12.jpg", score: 5.0, reviewer: 'Cristofer Ekstrom Bothman', text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { image: "assets/7.jpg", score: 5.0, reviewer: 'Kaija Lubin', text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { image: "assets/4.jpg", score: 5.0, reviewer: 'Erin Septimus', text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
  ];
}
