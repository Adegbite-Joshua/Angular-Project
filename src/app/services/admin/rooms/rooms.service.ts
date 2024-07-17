import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private rooms = new BehaviorSubject<any[]>([
    {
      number: '001',
      bedType: 'Double bed',
      floor: '-1',
      facility: 'AC, shower, Double bed, towel, bathtub, TV',
      status: 'Available',
      occupied: false,
      category: 'Double',
      checkInDate: null,
      checkOutDate: null,
      reservations: []
    },
    {
      number: '002',
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
      ]
    },
    {
      number: '003',
      bedType: 'Triple bed',
      floor: '-1',
      facility: 'AC, shower, Triple bed, towel, bathtub, TV',
      status: 'Available',
      occupied: false,
      category: 'Triple',
      checkInDate: null,
      checkOutDate: null,
      reservations: []
    },
    {
      number: '004',
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
      ]
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

  addRoom(room: any) {
    const currentRooms = this.rooms.value;
    this.rooms.next([...currentRooms, room]);
  }

  deleteRoom(number: string): Observable<void> {
    const rooms = this.rooms.value.filter(room => room.number !== number);
    this.rooms.next(rooms);
    return of();
  }

  bookRoom(number: string, email: string): Observable<any> {
    const rooms = this.rooms.value.map(room => {
      if (room.number === number) {
        room.status = 'Booked';
        room.occupied = true;
        room.checkInDate = new Date().toISOString().split('T')[0];
        room.checkOutDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
        room.reservations.push({
          checkInDate: room.checkInDate,
          checkOutDate: room.checkOutDate,
          email
        });
      }
      return room;
    });
    this.rooms.next(rooms);
    return of(rooms.find(room => room.number === number));
  }
}
