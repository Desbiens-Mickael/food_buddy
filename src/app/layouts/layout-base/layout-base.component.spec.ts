import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBaseComponent } from './layout-base.component';

describe('LayoutBaseComponent', () => {
  let component: LayoutBaseComponent;
  let fixture: ComponentFixture<LayoutBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutBaseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
