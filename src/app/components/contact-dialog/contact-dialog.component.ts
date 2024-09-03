import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactUsFormComponent } from '../contact-us-form/contact-us-form.component';

@Component({
  imports: [ContactUsFormComponent],
  standalone: true,
  selector: 'app-contact-dialog',
  template: `
    <div mat-dialog-content>
      <app-contact-us-form>
        <button class="bg-danger p-2 rounded-md" (click)="onClose()">Close</button>
      </app-contact-us-form>
    </div>
  `,
})
export class ContactDialogComponent {
  constructor(public dialogRef: MatDialogRef<ContactDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
