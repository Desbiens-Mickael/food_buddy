import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishementsSettingsPageComponent } from './establishements-settings-page.component';

describe('EstablishementsSettingsPageComponent', () => {
  let component: EstablishementsSettingsPageComponent;
  let fixture: ComponentFixture<EstablishementsSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishementsSettingsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishementsSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
