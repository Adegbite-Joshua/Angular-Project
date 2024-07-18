import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  @Input() public placementRight: any;  
  @Input() public roomType: any;  
  @Input() public numberOfBed: any;  
  @Input() public numberOfPeople: any;  
}
