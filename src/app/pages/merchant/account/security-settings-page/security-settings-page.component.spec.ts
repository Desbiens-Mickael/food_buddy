import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritySettingsPageComponent } from './security-settings-page.component';

describe('SecuritySettingsPageComponent', () => {
  let component: SecuritySettingsPageComponent;
  let fixture: ComponentFixture<SecuritySettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritySettingsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecuritySettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
