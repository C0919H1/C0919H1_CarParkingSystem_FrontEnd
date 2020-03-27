import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeletedComponent } from './customer-deleted.component';

describe('CustomerDeletedComponent', () => {
  let component: CustomerDeletedComponent;
  let fixture: ComponentFixture<CustomerDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
