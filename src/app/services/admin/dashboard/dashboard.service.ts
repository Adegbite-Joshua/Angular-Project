import { Injectable } from '@angular/core';
import axios from 'axios';
import { serverUrl } from '../../../constants/server';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  public metrics = new BehaviorSubject<any>({});
  public reviews = new BehaviorSubject<any[]>([]);

  async getMetrics():Promise<any> {
    if (Object.keys(this.metrics.value).length > 0) {
      return this.metrics.asObservable();
    }
    try {
      const response = await axios.get(`${serverUrl}/api/admin/metrics`)
      this.metrics.next(response.data.data);
      console.log(response.data.data);
      
      return response.data.data;
    } catch (error) {
      console.log(error);
        return {};
    }
  }

  getOverview():any {
    if (Object.keys(this.metrics.value).length > 0) {
      return this.metrics.asObservable();
    }
    axios.get(`${serverUrl}/api/admin/metrics`)
      .then(response => {
        console.log(response);
        this.metrics.next(response.data.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        return {};
      })
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

  async getCustomerReviews():Promise<any> {
    if (this.reviews.value?.length > 0) {
      return this.reviews.asObservable();
    }
    try {
      const response = await axios.get(`${serverUrl}/api/reviews`);
      console.log(response);
      this.reviews.next(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
