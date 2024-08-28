import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbareDesktopComponent } from './navbare.component';

describe('NavbareComponent', () => {
  let component: NavbareDesktopComponent;
  let fixture: ComponentFixture<NavbareDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbareDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbareDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
