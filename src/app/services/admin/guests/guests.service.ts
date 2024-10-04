import { Injectable } from '@angular/core';
import axios from 'axios';
import { serverUrl } from '../../../constants/server';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  public guests = new BehaviorSubject<any[]>([]);

  constructor () {
    axios.post(`${serverUrl}/api/admin/guests`)
    .then( response => {
      console.log();
      this.guests.next(response.data.data);
    })
    .catch( error => {
      console.log(error);
      
    })
  }


  getGuests() {
    return this.guests.asObservable;
  }

  checkIn(id: number) {
    const guest = this.guests.value.find(g => g.id === id);
    if (guest) {
      guest.status = 'checked_in';
    }
  }

  checkOut(id: number) {
    const guest = this.guests.value.find(g => g.id === id);
    if (guest) {
      guest.status = 'checked_out';
    }
  }

  searchGuests(roomNumber: string) {
    return this.guests.value.filter(guest => guest.roomNumber.toLowerCase().includes(roomNumber.toLowerCase()));
  }
}
