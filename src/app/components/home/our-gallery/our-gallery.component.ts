import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@Component({
  selector: 'app-our-gallery',
  standalone: true,
  imports: [CommonModule ,SlickCarouselModule],
  templateUrl: './our-gallery.component.html',
  styleUrl: './our-gallery.component.scss'
})
export class OurGalleryComponent {
  slides = [
    {img: '/assets/1.jpg'},
    {img: '/assets/2.jpg'},
    {img: '/assets/3.jpg'},
    {img: '/assets/4.jpg'},
    {img: '/assets/5.jpg'},
    {img: '/assets/6.jpg'},
    {img: '/assets/7.jpg'},
    {img: '/assets/8.jpg'},
    {img: '/assets/9.jpg'},
    {img: '/assets/10.jpg'},
    {img: '/assets/11.jpg'},
    {img: '/assets/12.jpg'},
    {img: '/assets/13.jpg'},
    {img: '/assets/14.jpg'},
    {img: '/assets/15.jpg'},
    {img: '/assets/16.jpg'},
  ];
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<span class='nav-btn next-slide bg-black text-white font-bold p-1 rounded-full'>></span>",
    "prevArrow": "<span class='nav-btn prev-slide bg-black text-white font-bold p-1 rounded-full'><</span>",
    "dots": true,
    "infinite": false,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "arrows": true,
          "ïnfinite": true,
          "slidesToShow": 3,
          "slidesToScroll": 3
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "ïnfinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        }
      }
    ]
  };

}
