import { Component } from '@angular/core';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-write-review',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './write-review.component.html',
  styleUrl: './write-review.component.scss'
})
export class WriteReviewComponent {
  reviewContent: string = '';
  selectedFile: File | null = null;
  base64Image: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {}

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
    if (this.reviewContent && this.base64Image) {
      const payload = {
        review: this.reviewContent,
        image: this.base64Image
      };

      this.http.post('your-server-endpoint', payload).subscribe(
        response => {
          console.log('Review submitted successfully', response);
          this.reviewContent = '';
          this.selectedFile = null;
          this.base64Image = null;
        },
        error => {
          console.error('Error submitting review', error);
        }
      );
    }
  }
}
