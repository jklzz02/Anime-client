import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSelectComponent } from './anime-select.component';

describe('AnimeSelectComponent', () => {
  let component: AnimeSelectComponent;
  let fixture: ComponentFixture<AnimeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
