import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSponsoringComponent } from './list-sponsoring.component';

describe('ListSponsoringComponent', () => {
  let component: ListSponsoringComponent;
  let fixture: ComponentFixture<ListSponsoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSponsoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSponsoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
