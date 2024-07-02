import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedRoomComponent } from './booked-room.component';

describe('BookedRoomComponent', () => {
  let component: BookedRoomComponent;
  let fixture: ComponentFixture<BookedRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookedRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookedRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
