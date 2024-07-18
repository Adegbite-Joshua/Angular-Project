import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor() { }
  private rooms = new BehaviorSubject<any[]>([
    {
      number: '001',
      id: '001',
      bedType: 'Double bed',
      floor: '-1',
      facility: 'AC, shower, Double bed, towel, bathtub, TV',
      status: 'Available',
      occupied: false,
      category: 'Double',
      checkInDate: null,
      checkOutDate: null,
      reservations: [],
      images: ['assets/1.jpg', '12.jpg', 'assets/7.jpg']
    },
    {
      number: '002',
      id: '002',
      bedType: 'Single bed',
      floor: '-2',
      facility: 'AC, shower, Single bed, towel, bathtub, TV',
      status: 'Booked',
      occupied: true,
      category: 'Single',
      checkInDate: '2024-07-10',
      checkOutDate: '2024-07-15',
      reservations: [
        { checkInDate: '2024-07-10', checkOutDate: '2024-07-15' }
      ],
      images: ['assets/1.jpg', '12.jpg', 'assets/7.jpg']
    },
    {
      number: '003',
      id: '003',
      bedType: 'Triple bed',
      floor: '-1',
      facility: 'AC, shower, Triple bed, towel, bathtub, TV',
      status: 'Available',
      occupied: false,
      category: 'Triple',
      checkInDate: null,
      checkOutDate: null,
      reservations: [],
      images: ['assets/1.jpg', '12.jpg', 'assets/7.jpg']
    },
    {
      number: '004',
      id: '004',
      bedType: 'Single bed',
      floor: '-2',
      facility: 'AC, shower, Single bed, towel, bathtub, TV',
      status: 'Booked',
      occupied: true,
      category: 'Single',
      checkInDate: '2024-07-12',
      checkOutDate: '2024-07-18',
      reservations: [
        { checkInDate: '2024-07-12', checkOutDate: '2024-07-18' }
      ],
      images: ['assets/1.jpg', '12.jpg', 'assets/7.jpg']
    }
  ]);

  getRooms() {
    return this.rooms.asObservable();
  }

  // Method to check if a room is available within a date range
  isRoomAvailable(room: any, checkInDate: string, checkOutDate: string): boolean {
    const newCheckIn = new Date(checkInDate);
    const newCheckOut = new Date(checkOutDate);

    for (let reservation of room.reservations) {
      const roomCheckIn = new Date(reservation.checkInDate);
      const roomCheckOut = new Date(reservation.checkOutDate);

      if (newCheckIn <= roomCheckOut && newCheckOut >= roomCheckIn) {
        return false;
      }
    }
    return true;
  }

}
