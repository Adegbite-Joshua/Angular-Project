import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { GeneralNavbarComponent } from '../../components/navbar/general-navbar/general-navbar.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { RouterLink } from '@angular/router';


interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface Room {
  number: number;
  price: number;
  rating: number;
  name: string;
  description: string;
  category: string;
  images: string[];
}

@Component({
  selector: 'app-all-rooms',
  standalone: true,
  imports: [
    GeneralNavbarComponent,
    FooterComponent,
    StarRatingComponent,
    MatSliderModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatGridListModule,
    RouterLink
  ],
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.scss']
})

export class AllRoomsComponent implements OnInit {
  tiles: Tile[] = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

  filterForm: FormGroup;
  ratings: number[] = [1, 2, 3, 4, 5];
  categories: string[] = ['Single', 'Double', 'Suite'];
  rooms: Room[] = [
    {
      number: 101,
      name: "Luxury Single Room",
      description: "A luxurious single room with modern amenities and a beautiful city view.",
      price: 100,
      rating: 5,
      category: 'Single',
      images: ['assets/1.jpg', 'assets/2.jpg', 'assets/1.jpg', 'assets/2.jpg']
    },
    {
      number: 102,
      name: "Deluxe Double Room",
      description: "Spacious double room with a comfortable king-sized bed and a scenic view.",
      price: 200,
      rating: 4,
      category: 'Double',
      images: ['assets/3.jpg', 'assets/4.jpg']
    },
    {
      number: 103,
      name: "Executive Suite",
      description: "A luxurious suite offering premium comfort and exclusive amenities.",
      price: 300,
      rating: 3,
      category: 'Suite',
      images: ['assets/5.jpg', 'assets/6.jpg']
    },
    {
      number: 104,
      name: "Comfort Single Room",
      description: "A cozy single room with all the necessary amenities for a comfortable stay.",
      price: 150,
      rating: 4,
      category: 'Single',
      images: ['assets/7.jpg', 'assets/8.jpg', 'assets/7.jpg']
    },
    {
      number: 105,
      name: "Standard Double Room",
      description: "A standard double room with modern furnishings and a relaxing ambiance.",
      price: 250,
      rating: 5,
      category: 'Double',
      images: ['assets/9.jpg', 'assets/10.jpg']
    },
    {
      number: 106,
      name: "Premium Suite",
      description: "A premium suite with a spacious living area and top-notch amenities.",
      price: 350,
      rating: 3,
      category: 'Suite',
      images: ['assets/11.jpg', 'assets/12.jpg']
    },
    {
      number: 107,
      name: "Deluxe Single Room",
      description: "A deluxe single room with elegant decor and a comfortable setting.",
      price: 180,
      rating: 5,
      category: 'Single',
      images: ['assets/13.jpg', 'assets/14.jpg', 'assets/13.jpg', 'assets/14.jpg']
    },
    {
      number: 108,
      name: "Superior Double Room",
      description: "A superior double room with premium furnishings and a relaxing environment.",
      price: 280,
      rating: 4,
      category: 'Double',
      images: ['assets/15.jpg', 'assets/16.jpg']
    },
    {
      number: 109,
      name: "Elegant Suite",
      description: "An elegant suite with stylish decor and first-class amenities.",
      price: 380,
      rating: 2,
      category: 'Suite',
      images: ['assets/17.jpg', 'assets/18.jpg']
    },
    {
      number: 110,
      name: "Basic Single Room",
      description: "A basic single room with essential amenities for a budget-friendly stay.",
      price: 120,
      rating: 1,
      category: 'Single',
      images: ['assets/19.jpg', 'assets/20.jpg']
    }
  ];

  filteredRooms: Room[] = [...this.rooms];
  minPrice: number;
  maxPrice: number;

  constructor(private fb: FormBuilder) {
    this.minPrice = Math.min(...this.rooms.map(room => room.price));
    this.maxPrice = Math.max(...this.rooms.map(room => room.price));
    this.filterForm = this.fb.group({
      priceRange: [[this.minPrice, this.maxPrice]],
      rating: [null],
      category: [null]
    });
  }

  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: any): void {
    this.filteredRooms = this.rooms.filter(room => {
      return (
        (!filters.priceRange || (room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1])) &&
        (!filters.rating || room.rating === filters.rating) &&
        (!filters.category || room.category === filters.category)
      );
    });
    console.log(this.filteredRooms);
  }

  resetFilters(): void {
    this.filterForm.reset({
      priceRange: [this.minPrice, this.maxPrice],
      rating: null,
      category: null
    });
  }

  formatLabel(value: number): string {
    return `$${value}`;
  }

  updatePriceRange(event: Event): void {
    const value = (event.target as HTMLInputElement).value.split(',');
    this.filterForm.patchValue({
      priceRange: [parseInt(value[0], 10), parseInt(value[1], 10)]
    });
  }

  trackByFn(index: number, item: any): any {
    return index;
  }

  getGridCols(length: number): number {
    switch (length) {
      case 2:
        return 2;
      case 3:
      case 4:
        return 2;
      case 5:
        return 3;
      default:
        return 1;
    }
  }

  getColSpan(length: number, index: number): number {
    if (length === 3) {
      return index < 2 ? 1 : 2;
    }
    if (length === 5) {
      return index === 0 ? 2 : 1;
    }
    return 1;
  }

  getRowSpan(length: number, index: number): number {
    if (length === 5 && index === 0) {
      return 2;
    }
    return 1;
  }
}
