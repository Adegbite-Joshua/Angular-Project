import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { serverUrl } from '../../constants/server';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule, 
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public email = "adegbitejoshua07@gmail.com"

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      // Process the form values
      const formValues = this.feedbackForm.value;
      this.http.post(`${serverUrl}/api/contact_us`, formValues).subscribe(
        (response) => {
          this.toastr.success('We have received your message,  trust us, we will act on it promptly!');
        },
        (error) => {
          this.toastr.error('Something went wrong, please try again');
        }
      )
      this.feedbackForm.reset();
    }
  }

}
