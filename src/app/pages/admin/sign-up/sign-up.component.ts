import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AdminNavbarComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.adminForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      image: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      nin_number: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      zip_code: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      address: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.adminForm.valid) {
      console.log('Form Submitted', this.adminForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  get form() {
    return this.adminForm.controls;
  }
}
