import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {
  private guests = [
    { id: 5644, name: 'Alexander', roomNumber: 'A647', totalAmount: 467, amountPaid: 200, status: 'Clean' },
    { id: 6112, name: 'Pegasus', roomNumber: 'A456', totalAmount: 645, amountPaid: 250, status: 'Dirty' },
    { id: 6141, name: 'Martin', roomNumber: 'A645', totalAmount: 686, amountPaid: 400, status: 'Dirty' },
    { id: 6535, name: 'Cecil', roomNumber: 'A684', totalAmount: 8413, amountPaid: 2500, status: 'Inspected' },
    { id: 6541, name: 'Luke', roomNumber: 'B464', totalAmount: 841, amountPaid: 400, status: 'Clean' },
    { id: 9846, name: 'Yadrin', roomNumber: 'C648', totalAmount: 684, amountPaid: 300, status: 'Clean' },
    { id: 4921, name: 'Kiand', roomNumber: 'D644', totalAmount: 984, amountPaid: 513, status: 'Pick up' },
    { id: 9841, name: 'Turen', roomNumber: 'B641', totalAmount: 984, amountPaid: 600, status: 'Dirty' }
  ];

  getGuests() {
    return this.guests;
  }

  checkIn(id: number) {
    const guest = this.guests.find(g => g.id === id);
    if (guest) {
      guest.status = 'Checked In';
    }
  }

  checkOut(id: number) {
    const guest = this.guests.find(g => g.id === id);
    if (guest) {
      guest.status = 'Checked Out';
    }
  }

  searchGuests(roomNumber: string) {
    return this.guests.filter(guest => guest.roomNumber.toLowerCase().includes(roomNumber.toLowerCase()));
  }
}
