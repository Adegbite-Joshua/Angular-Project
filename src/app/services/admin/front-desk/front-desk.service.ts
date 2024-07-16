import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontDeskService {

  constructor() { }

  private bookings = [
    { name: 'Lewis', status: 'checked out', startDate: new Date('2023-05-01'), endDate: new Date('2023-05-03') },
    { name: 'Mark', status: 'checked out', startDate: new Date('2023-05-02'), endDate: new Date('2023-05-05') },
    { name: 'Tate', status: 'checked out', startDate: new Date('2023-05-01'), endDate: new Date('2023-05-06') },
    { name: 'Bruce', status: 'due out', startDate: new Date('2023-05-03'), endDate: new Date('2023-05-06') },
    { name: 'Andrew', status: 'due out', startDate: new Date('2023-05-09'), endDate: new Date('2023-05-11') },
    { name: 'Lewis', status: 'checked in', startDate: new Date('2023-05-07'), endDate: new Date('2023-05-10') },
    { name: 'Mike', status: 'checked out', startDate: new Date('2023-05-06'), endDate: new Date('2023-05-08') },
    { name: 'Manson', status: 'due in', startDate: new Date('2023-05-05'), endDate: new Date('2023-05-07') },
    { name: 'Mave', status: 'checked in', startDate: new Date('2023-05-08'), endDate: new Date('2023-05-10') },
    { name: 'Otis', status: 'due in', startDate: new Date('2023-05-06'), endDate: new Date('2023-05-09') },
    { name: 'White', status: 'checked in', startDate: new Date('2023-05-09'), endDate: new Date('2023-05-11') },
    { name: 'Black', status: 'due out', startDate: new Date('2023-05-03'), endDate: new Date('2023-05-04') },
  ];

  getBookings() {
    return this.bookings;
  }
}
