import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListAdminComponent } from './events-list-admin.component';

describe('EventsListAdminComponent', () => {
  let component: EventsListAdminComponent;
  let fixture: ComponentFixture<EventsListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
