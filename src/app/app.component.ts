import { Component, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { ContactDialogComponent } from './components/contact-dialog/contact-dialog.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
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
