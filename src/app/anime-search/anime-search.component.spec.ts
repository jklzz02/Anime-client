import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSearchComponent } from './anime-search.component';

describe('AnimeSearchComponent', () => {
  let component: AnimeSearchComponent;
  let fixture: ComponentFixture<AnimeSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
