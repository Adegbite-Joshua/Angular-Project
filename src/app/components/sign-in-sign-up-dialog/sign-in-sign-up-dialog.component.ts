import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-sign-in-sign-up-dialog',
  standalone: true,
  imports: [MatFormField, MatLabel, FormsModule],
  templateUrl: './sign-in-sign-up-dialog.component.html',
  styleUrl: './sign-in-sign-up-dialog.component.scss'
})
export class SignInSignUpDialogComponent {
  isSignIn: boolean = true; // Toggle between sign in and sign up

  constructor(private dialogRef: MatDialogRef<SignInSignUpDialogComponent>) {}

  toggleView() {
    this.isSignIn = !this.isSignIn; // Toggle the boolean value
  }

  closeDialog() {
    this.dialogRef.close();
  }

  // Sign in method
  signIn(form: any) {
    console.log('Sign In', form.value);
    // Implement your sign in logic here
  }

  // Sign up method
  signUp(form: any) {
    console.log('Sign Up', form.value);
    // Implement your sign up logic here
  }
}
