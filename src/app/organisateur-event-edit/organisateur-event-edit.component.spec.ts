import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisateurEventEditComponent } from './organisateur-event-edit.component';

describe('OrganisateurEventEditComponent', () => {
  let component: OrganisateurEventEditComponent;
  let fixture: ComponentFixture<OrganisateurEventEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisateurEventEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisateurEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
