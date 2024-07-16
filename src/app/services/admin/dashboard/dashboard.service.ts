import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getOverview() {
    return {
      checkIn: 23,
      checkOut: 13,
      inHotel: 60,
      availableRoom: 10,
      occupiedRoom: 90
    };
  }

  getRoomTypes() {
    return [
      { type: 'Single sharing', available: 2, total: 30, price: 568 },
      { type: 'Double sharing', available: 2, total: 35, price: 1068 },
      { type: 'Triple sharing', available: 2, total: 25, price: 1568 },
      { type: 'VIP Suit', available: 4, total: 10, price: 2568 }
    ];
  }

  getRoomStatus() {
    return { occupied: 104, clean: 90, dirty: 4, inspected: 60 };
  }

  getFloorStatus() {
    return 80; // 80% completed
  }

  getOccupancyStatistics() {
    return [60, 70, 75, 80, 85, 90, 95, 80, 85, 70, 75, 80];
  }

  getCustomerFeedback() {
    return [
      { name: 'Mark', review: 'Food could be better.', star_rating: 3 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid. Facilities are not enough for amount paid Facilities are not enough for amount paid', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid. Facilities are not enough for amount paid', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Christian', review: 'Facilities are not enough for amount paid.', star_rating: 4 },
      { name: 'Alexander', review: 'Room cleaning could be better.', star_rating: 2 }
    ];
  }
}
