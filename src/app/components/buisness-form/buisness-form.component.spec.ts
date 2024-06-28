import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessFormComponent } from './buisness-form.component';

describe('BuisnessFormComponent', () => {
  let component: BuisnessFormComponent;
  let fixture: ComponentFixture<BuisnessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuisnessFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuisnessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
