import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisateurEventAddComponent } from './organisateur-event-add.component';

describe('OrganisateurEventAddComponent', () => {
  let component: OrganisateurEventAddComponent;
  let fixture: ComponentFixture<OrganisateurEventAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisateurEventAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisateurEventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
