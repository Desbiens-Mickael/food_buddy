import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenBadgeComponent } from './allergen-badge.component';

describe('AllergenBadgeComponent', () => {
  let component: AllergenBadgeComponent;
  let fixture: ComponentFixture<AllergenBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergenBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllergenBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
