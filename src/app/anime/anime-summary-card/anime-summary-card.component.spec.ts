import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSummaryCardComponent } from './anime-summary-card.component';

describe('AnimeSummaryCardComponent', () => {
  let component: AnimeSummaryCardComponent;
  let fixture: ComponentFixture<AnimeSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeSummaryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
