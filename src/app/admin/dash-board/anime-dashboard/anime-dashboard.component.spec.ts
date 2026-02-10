import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDashboardComponent } from './anime-dashboard.component';

describe('AnimeDashboardComponent', () => {
  let component: AnimeDashboardComponent;
  let fixture: ComponentFixture<AnimeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
