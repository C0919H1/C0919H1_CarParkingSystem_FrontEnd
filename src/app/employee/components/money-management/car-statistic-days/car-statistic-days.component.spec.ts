import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarStatisticDaysComponent } from './car-statistic-days.component';

describe('CarStatisticDaysComponent', () => {
  let component: CarStatisticDaysComponent;
  let fixture: ComponentFixture<CarStatisticDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarStatisticDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarStatisticDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
