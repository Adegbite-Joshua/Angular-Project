import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactUsFormComponent } from '../contact-us-form/contact-us-form.component';

@Component({
  imports: [ContactUsFormComponent],
  standalone: true,
  selector: 'app-contact-dialog',
  template: `
    <h1 mat-dialog-title>Contact Us</h1>
    <div mat-dialog-content>
      <app-contact-us-form></app-contact-us-form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </div>
  `,
})
export class ContactDialogComponent {
  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
