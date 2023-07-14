import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurOffreListComponent } from './fournisseur-offre-list.component';

describe('FournisseurOffreListComponent', () => {
  let component: FournisseurOffreListComponent;
  let fixture: ComponentFixture<FournisseurOffreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurOffreListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurOffreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
