import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  constructor () {}

  private rooms = [
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
    { number: '001', bedType: 'Double bed', floor: '-1', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Available' },
    { number: '002', bedType: 'Single bed', floor: '-2', facility: 'AC, shower, Double bed, towel, bathtub, TV', status: 'Booked' },
  ];

  getRooms() {
    return this.rooms;
  }
}
