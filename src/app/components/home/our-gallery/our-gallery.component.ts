import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RoomsService } from '../../../services/rooms/rooms.service';
import { RouterLink } from '@angular/router';
// import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';


@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule ,SlickCarouselModule, RouterLink],
  templateUrl: './our-gallery.component.html',
  styleUrl: './our-gallery.component.scss'
})
export class OurGalleryComponent {

  public rooms = <any>[];

  constructor (private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomsService.getRooms().subscribe(rooms => {
      this.rooms = rooms
    });
  }

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide bg-blue-600 text-white font-bold p-1 rounded-full'>></span>",
    "prevArrow": "<span class='nav-btn prev-slide bg-blue-600 text-white font-bold p-1 rounded-full'><</span>",
    "dots": true,
    "infinite": false,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "ïnfinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 1
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "ïnfinite": true,
          "slidesToShow": 1,
          "dots": false,
          "slidesToScroll": 1
        }
      }
    ]
  };

}
