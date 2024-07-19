import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCardProductComponent } from './details-card-product.component';

describe('DetailsCardProductComponent', () => {
  let component: DetailsCardProductComponent;
  let fixture: ComponentFixture<DetailsCardProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCardProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsCardProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
