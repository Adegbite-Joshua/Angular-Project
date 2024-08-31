import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class ContactUsFormComponent {

  onSubmit(contactForm: NgForm): void {
    if (contactForm.valid) {
      const formData = contactForm.value;
      // Handle form submission logic, such as sending the data to an API
      console.log('Form Data:', formData);

      // Optionally, you can reset the form
      contactForm.resetForm();
    }
  }
}
