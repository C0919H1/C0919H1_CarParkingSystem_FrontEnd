import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPickedComponent } from './ticket-picked.component';

describe('TicketPickedComponent', () => {
  let component: TicketPickedComponent;
  let fixture: ComponentFixture<TicketPickedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPickedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPickedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
