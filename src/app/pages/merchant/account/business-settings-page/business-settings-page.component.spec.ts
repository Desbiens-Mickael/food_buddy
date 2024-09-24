import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSettingsPageComponent } from './business-settings-page.component';

describe('BusinessSettingsPageComponent', () => {
  let component: BusinessSettingsPageComponent;
  let fixture: ComponentFixture<BusinessSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessSettingsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
