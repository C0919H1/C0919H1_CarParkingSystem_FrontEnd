import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStatisticComponent } from './car-statistic.component';

describe('CarStatisticComponent', () => {
  let component: CarStatisticComponent;
  let fixture: ComponentFixture<CarStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
