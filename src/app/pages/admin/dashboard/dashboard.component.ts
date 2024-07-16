import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../../../services/admin/dashboard/dashboard.service';
// import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { RouterLink } from '@angular/router';
import { AdminNavbarComponent } from '../../../components/navbar/admin-navbar/admin-navbar.component';
import { StarRatingComponent } from '../../../components/star-rating/star-rating.component';

Chart.register(...registerables);


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ AdminNavbarComponent, StarRatingComponent, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('myChart2') myChart2!: ElementRef<HTMLCanvasElement>;

  overview: any = {};
  roomTypes: any[] = [];
  roomStatus: any = {};
  floorChartData: any[] = [];
  floorChartLabels: string[] = [];
  occupancyChartData: any[] = [];
  occupancyChartLabels: string[] = [];
  customerFeedback: any[] = [];

  constructor(private dataService: DashboardService) { }

  ngOnInit(): void {
    this.overview = this.dataService.getOverview();
    this.roomTypes = this.dataService.getRoomTypes();
    this.roomStatus = this.dataService.getRoomStatus();
    this.floorChartData = [this.dataService.getFloorStatus(), 100 - this.dataService.getFloorStatus()];
    this.floorChartLabels = ['Completed', 'Yet to Complete'];
    this.occupancyChartData = [{ data: this.dataService.getOccupancyStatistics(), label: 'Occupancy Rate' }];
    this.occupancyChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.customerFeedback = this.dataService.getCustomerFeedback();
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    const chartItem: ChartItem = this.myChart.nativeElement;
    const chartItem2: ChartItem = this.myChart2.nativeElement;
    new Chart(chartItem2, {
      type: 'pie',
      data: {
        labels: this.occupancyChartLabels,
        datasets: this.occupancyChartData
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
    new Chart(chartItem, {
      type: 'bar',
      data: {
        labels: this.occupancyChartLabels,
        datasets: this.occupancyChartData
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: true },
          y: { beginAtZero: true }
        }
      }
    });
  }
}
