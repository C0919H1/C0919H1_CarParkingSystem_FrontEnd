import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleInOutComponent } from './vehicle-in-out.component';

describe('VehicleInOutComponent', () => {
  let component: VehicleInOutComponent;
  let fixture: ComponentFixture<VehicleInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
