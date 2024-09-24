import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEstablishmentFormComponent } from './full-establishment-form.component';

describe('FullEstablishmentFormComponent', () => {
  let component: FullEstablishmentFormComponent;
  let fixture: ComponentFixture<FullEstablishmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullEstablishmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FullEstablishmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
