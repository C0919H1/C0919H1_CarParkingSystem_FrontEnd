import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPositionAddComponent } from './parking-position-add.component';

describe('ParkingPositionAddComponent', () => {
  let component: ParkingPositionAddComponent;
  let fixture: ComponentFixture<ParkingPositionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPositionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
