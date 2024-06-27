import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNavbarComponent } from './link-navbar.component';

describe('LinkNavbarComponent', () => {
  let component: LinkNavbarComponent;
  let fixture: ComponentFixture<LinkNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
