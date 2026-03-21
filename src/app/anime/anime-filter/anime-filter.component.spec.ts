import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeFilterComponent } from './anime-filter.component';

describe('AnimeFilterComponent', () => {
  let component: AnimeFilterComponent;
  let fixture: ComponentFixture<AnimeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
