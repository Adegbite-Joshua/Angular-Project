import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { serverUrl } from '../../constants/server';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule]
})
export class ContactUsFormComponent {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  onSubmit(contactForm: NgForm): void {
    if (contactForm.valid) {
      const formData = contactForm.value;
      this.http.post(`${serverUrl}/api/contact_us`, formData).subscribe(
        (response)=>{
          this.toastr.success('We have received your message,  trust us, we will act on it promptly!');
        },
        (error)=>{
          alert('Something went wrong, please try again');
        }
      )
      console.log('Form Data:', formData);
      contactForm.resetForm();
    }
  }
}
