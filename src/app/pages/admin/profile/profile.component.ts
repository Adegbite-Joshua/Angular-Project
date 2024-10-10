import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';
import { AuthService } from '../../../services/admin/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private authService: AuthService) { }
  isEditing = false;
  user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image: '',
    telephone: '',
    used_google_oauth: '',
    gender: '',
    role: '',
    nin_number: '',
    city: '',
    zip_code: '',
    address: ''
};

  ngOnInit() {
    this.user = this.authService.getAdminDetails() as any;
    this.authService.adminDetails.subscribe(details => {
      this.user = details;
    })
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  isPasswordVisible = false; // Initially hide the password

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  saveDetails() {
    this.isEditing = false;
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
