import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbareComponent } from './mobile-navbare.component';

describe('MobileNavbareComponent', () => {
  let component: MobileNavbareComponent;
  let fixture: ComponentFixture<MobileNavbareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavbareComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
