import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSearchResultsComponent } from './anime-search-results.component';

describe('AnimeSearchResultsComponent', () => {
  let component: AnimeSearchResultsComponent;
  let fixture: ComponentFixture<AnimeSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
