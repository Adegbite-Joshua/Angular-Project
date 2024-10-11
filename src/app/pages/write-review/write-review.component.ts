import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { serverUrl } from '../../constants/server';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, CommonModule, FormsModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule, StarRatingComponent],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  reviewerName: string = '';
  reviewContent: string = '';
  selectedFile: File | null = null;
  base64Image: string | ArrayBuffer | null = null;
  starRating: number = 0;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.convertFileToBase64(this.selectedFile);
    }
  }

  convertFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.reviewContent && this.base64Image && this.reviewerName && this.starRating) {
      const payload = {
        review: this.reviewContent,
        image: this.base64Image,
        name: this.reviewerName,
        star_rating: this.starRating
      };

      console.log(payload);
      

      this.http.post(`${serverUrl}/api/reviews`, payload).subscribe(
        response => {
          this.toastr.success('Thanks for your review!');
          this.reviewContent = '';
          this.selectedFile = null;
          this.base64Image = null;
        },
        error => {
          console.error('Error submitting review', error);
          this.toastr.error('Something went wrong, please try again!');
        }
      );
    }
  }
}
