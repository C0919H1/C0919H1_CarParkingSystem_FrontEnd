import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPositionEditComponent } from './parking-position-edit.component';

describe('ParkingPositionEditComponent', () => {
  let component: ParkingPositionEditComponent;
  let fixture: ComponentFixture<ParkingPositionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPositionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
