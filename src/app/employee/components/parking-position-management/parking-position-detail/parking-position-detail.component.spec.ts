import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPositionDetailComponent } from './parking-position-detail.component';

describe('ParkingPositionDetailComponent', () => {
  let component: ParkingPositionDetailComponent;
  let fixture: ComponentFixture<ParkingPositionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPositionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
