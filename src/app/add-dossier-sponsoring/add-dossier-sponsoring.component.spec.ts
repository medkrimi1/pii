import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierSponsoringComponent } from './add-dossier-sponsoring.component';

describe('AddDossierSponsoringComponent', () => {
  let component: AddDossierSponsoringComponent;
  let fixture: ComponentFixture<AddDossierSponsoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDossierSponsoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDossierSponsoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
