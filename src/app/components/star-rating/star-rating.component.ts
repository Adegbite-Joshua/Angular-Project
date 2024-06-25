import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Input() readOnly: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  stars: boolean[] = [];

  ngOnInit() {
    this.calculateStars(this.rating);
  }

  calculateStars(rating: number) {
    this.stars = Array.from({ length: this.maxRating }, (_, index) => index < rating);
  }

  rate(rating: number) {
    if (!this.readOnly) {
      this.rating = rating;
      this.ratingChange.emit(this.rating);
      this.calculateStars(this.rating);
    }
  }

  hover(rating: number) {
    if (!this.readOnly) {
      this.calculateStars(rating);
    }
  }

  leave() {
    if (!this.readOnly) {
      this.calculateStars(this.rating);
    }
  }
}
