import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../../constants/server';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor() { this.fetchReviews()}
  private reviews = new BehaviorSubject<any[]>([
    { image: "assets/1.jpg", star_rating: 1.0, reviewer: 'Omar Siphron', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { image: "assets/12.jpg", star_rating: 5.0, reviewer: 'Cristofer Ekstrom Bothman', review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { image: "assets/7.jpg", star_rating: 3.0, reviewer: 'Kaija Lubin', review: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { image: "assets/4.jpg", star_rating: 2.0, reviewer: 'Erin Septimus', review: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }
  ]);

  fetchReviews() {
    axios.get(`${serverUrl}/api/reviews`)
      .then((response) => {   
        console.log(response);
             
        this.reviews.next(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }

  getReviews() {
    return this.reviews.asObservable();
  }

}
