import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'level4-project';

  constructor(public dialog: MatDialog) {}

  openContactDialog(): void {
    this.dialog.open(ContactDialogComponent, {
      width: '400px',
    });
  }
}
