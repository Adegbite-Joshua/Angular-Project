import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { serverUrl } from '../../../constants/server';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  public rooms = new BehaviorSubject<any[]>([]);

  constructor() {
    this.fetchRooms(); 
  }

  // Fetch rooms from the server
  async fetchRooms() {
    try {
      const rooms = await axios.get(`${serverUrl}/api/rooms`)
      console.log(rooms);
      this.rooms.next(rooms.data.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      
    }
  }


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

  deleteRoom(id: string): Observable<void> {
    const rooms = this.rooms.value.filter(room => room.id !== id);
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
