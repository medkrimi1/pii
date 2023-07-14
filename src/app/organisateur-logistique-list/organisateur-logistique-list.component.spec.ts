import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisateurLogistiqueListComponent } from './organisateur-logistique-list.component';

describe('OrganisateurLogistiqueListComponent', () => {
  let component: OrganisateurLogistiqueListComponent;
  let fixture: ComponentFixture<OrganisateurLogistiqueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisateurLogistiqueListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisateurLogistiqueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
