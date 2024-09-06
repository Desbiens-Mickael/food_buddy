import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsCardComponent } from './account-settings-card.component';

describe('AccountSettingsCardComponent', () => {
  let component: AccountSettingsCardComponent;
  let fixture: ComponentFixture<AccountSettingsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountSettingsCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSettingsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
