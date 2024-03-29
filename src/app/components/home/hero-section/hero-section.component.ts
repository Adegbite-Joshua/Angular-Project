import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {

}
