import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInSignUpDialogComponent } from './sign-in-sign-up-dialog.component';

describe('SignInSignUpDialogComponent', () => {
  let component: SignInSignUpDialogComponent;
  let fixture: ComponentFixture<SignInSignUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInSignUpDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
