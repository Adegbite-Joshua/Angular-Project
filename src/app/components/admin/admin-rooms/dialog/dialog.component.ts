import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { RoomsService } from '../../../../services/admin/rooms/rooms.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  roomForm: FormGroup;
  images: string[] = [];

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.roomForm = this.fb.group({
      title: ['', Validators.required],
      overview: ['', Validators.required],
      facility: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      images: ['', Validators.required],
      files: ['', Validators.required],
      number: ['Unassigned'],
      status: ['Available'],
      floor: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(e.target.result);
          this.roomForm.patchValue({ images: this.images });
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const newRoom = {
        ...this.roomForm.value,
        images: this.images
      };
      this.roomsService.addRoom(newRoom);
      this.dialogRef.close();
    }
  }
}
