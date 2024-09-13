import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import axios from 'axios';
import { serverUrl } from '../../constants/server';
import Cookies from 'js-cookie';
import { AuthService } from '../../services/auth/auth.service';
import { DashboardDialogComponent } from '../dashboard-dialog/dashboard-dialog.component';
@Component({
  selector: 'app-sign-in-sign-up-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in-sign-up-dialog.component.html',
  styleUrl: './sign-in-sign-up-dialog.component.scss'
})

export class SignInSignUpDialogComponent {
  isSignIn = true;
  signInForm: FormGroup;
  signUpForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<SignInSignUpDialogComponent>, private fb: FormBuilder, private dialog: MatDialog, private authService: AuthService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,}$/)]], // Example pattern for telephone validation
      gender: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  toggleView(value?: boolean) {
    this.isSignIn = value !== undefined ? value : !this.isSignIn;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSignIn() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value);

      axios.post(`${serverUrl}/api/login`, this.signInForm.value)
        .then(response => {
          alert('Login successful');
          const token = response.data.data.token;
          console.log(response.data);          
          console.log('token', token);
          
          Cookies.set('token', token, { expires: 7 });
          this.authService.changeLoginStatus(true);
          
          const user = { name: 'John Doe', email: 'john@example.com' };
          const bookings = [
            { room: '101', checkInDate: '2024-07-01', checkOutDate: '2024-07-05' },
            { room: '202', checkInDate: '2024-08-01', checkOutDate: '2024-08-10' },
          ];
          this.closeDialog();
          this.dialog.open(DashboardDialogComponent, {
            data: { user, bookings },
            width: "90%",
            height: "90%",
            panelClass: 'justify-center',
            // justifyContent: 'center',
            // padding: "20px",
          });

        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      axios.post(`${serverUrl}/api/signup`, this.signUpForm.value)
        .then(response => {
          alert('Registration successful');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
}
