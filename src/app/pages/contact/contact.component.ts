import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [GeneralNavbarComponent, FooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  public email = "adegbitejoshua07@gmail.com"

  feedbackForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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
      console.log('Form Submitted!', formValues);
      // You can send these values to your server or handle them as needed
    } else {
      console.log('Form is invalid');
    }
  }

}
