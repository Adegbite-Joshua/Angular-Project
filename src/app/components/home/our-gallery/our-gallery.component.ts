import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { GalleryModule, ImageItem } from 'ng-gallery';


@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule, GalleryModule],
  templateUrl: './our-gallery.component.html',
  styleUrl: './our-gallery.component.scss'
})
export class OurGalleryComponent {

  public rooms = <any>[];

  constructor (private roomsService: RoomsService) {}

  images:any;
  ngOnInit() {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe(rooms => {
      this.images = rooms.map((room) => {
        return new ImageItem({
          src: room.images[0],
          thumb: room.images[0],
          alt: room.name
        })
      })
    });
  }
}
