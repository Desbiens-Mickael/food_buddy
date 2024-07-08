import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBareSkeletonComponent } from './side-bare-skeleton.component';

describe('SideBareSkeletonComponent', () => {
  let component: SideBareSkeletonComponent;
  let fixture: ComponentFixture<SideBareSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBareSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBareSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
