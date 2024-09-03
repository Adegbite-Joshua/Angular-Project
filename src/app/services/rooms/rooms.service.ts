import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { serverUrl } from '../../constants/server';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor() {this.fetchRooms()}

  private rooms = new BehaviorSubject<any[]>([
    {
      number: '004',
      id: '004',
      price: 250,
      overview: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore velit, voluptatum quos deleniti magnam, eos estin fugiat fugit ipsam laudantium tenetur saepe ducimus quo ratione? Quia optio dolores, inventore hic oditdoloribus. Porro inventore ratione deleniti fugit quis. Recusandae odio soluta rerum nesciunt saepe ipsumobcaecati voluptate, mollitia suscipit dignissimos consequatur sed ut iste, commodi amet autem pariatur quoanimi dolores doloribus corrupti nemo molestiae fuga non. Eligendi illum perferendis eum quia ullam? Ipsaprovident eveniet dicta labore fugehn it quis perferendis, corrupti, officiis iste laborum earum excepturi asit?Omnis dolorem sequi voluptatum ducimus rerum distinctio deleniti quia nulla. Laboriosam, at distinctio adipiscifacere ducimus quisquam voluptates neque consectetur deleniti magni? Praesentium deserunt itaque vel aspernatur nostrum laborum quae.",
      title: 'Single bed',
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
      images: ['assets/1.jpg', 'assets/12.jpg', 'assets/7.jpg']
    }
  ]);

  fetchRooms() {
    axios.get(`${serverUrl}/api/rooms`)
      .then((response) => {        
        this.rooms.next(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }

  getRooms() {
    return this.rooms.asObservable();
  }

  getRoomDetails(id: any) {
    return this.rooms.value.find((room) => room.id == id);
  }

  getCategoryRooms(category: string, roomId: string) {
    return this.rooms.value.filter((room) => room.category == category && room.id != roomId)
  }

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
