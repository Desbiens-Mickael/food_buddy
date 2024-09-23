import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessRegisterFormComponent } from './buisness-register-form.component';

describe('BuisnessRegisterFormComponent', () => {
  let component: BuisnessRegisterFormComponent;
  let fixture: ComponentFixture<BuisnessRegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuisnessRegisterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuisnessRegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
