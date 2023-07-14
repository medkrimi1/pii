import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogistiqueComponent } from './logistique.component';

describe('LogistiqueComponent', () => {
  let component: LogistiqueComponent;
  let fixture: ComponentFixture<LogistiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogistiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogistiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
