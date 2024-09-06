import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../../constants/server';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  // Initialize BehaviorSubject with an empty array
  private rooms = new BehaviorSubject<any[]>([]);

  constructor() { 
    this.fetchRooms(); 
  }

  // Fetch rooms from the server
  fetchRooms() {
    axios.get(`${serverUrl}/api/rooms`)
      .then((response) => {
        this.rooms.next(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }

  // Return the observable for rooms
  getRooms() {
    return this.rooms.asObservable();
  }

  // Get room details by id
  async getRoomDetails(id: any): Promise<any> {
    try {
      const response = await axios.get(`${serverUrl}/api/rooms/${id}`);
      console.log(response);
      return response.data.data;  // Return the room data properly
    } catch (error) {
      console.error('Error fetching room details:', error);
      return null;  // Return null or handle error appropriately
    }
  }
  

  // getRoomDetails(id: any) {
  //   // Access the current value of the BehaviorSubject
  //   const currentRooms = this.rooms.value;
  
  //   // Find the room by id
  //   console.log(currentRooms);
    
  //   const roomDetails = currentRooms.find((room) => room.id == id);
  
  //   if (roomDetails) {
  //     return roomDetails;
  //   } else {
  //     console.error(`Room with ID ${id} not found`);
  //     return null;
  //   }
  // }

  // Get other rooms of the same category excluding the current roomId
  getCategoryRooms(category: string, roomId: string) {
    return this.rooms.value.filter((room) => room.category == category && room.id != roomId);
  }

  // Check room availability between checkInDate and checkOutDate
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
