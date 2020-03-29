import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPositionListComponent } from './parking-position-list.component';

describe('ParkingPositionListComponent', () => {
  let component: ParkingPositionListComponent;
  let fixture: ComponentFixture<ParkingPositionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPositionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
