import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AnimeListItem } from '../../../../interfaces/anime-list-item';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { AnimeService } from '../../../../services/http/anime.service';

@Component({
  selector: 'app-anime-select',
  standalone: false,
  templateUrl: './anime-select.component.html',
  styleUrl: './anime-select.component.css',
})
export class AnimeSelectComponent implements OnInit, OnDestroy {
  @Output() animeSelected = new EventEmitter<AnimeListItem>();

  query = '';
  suggestions: AnimeListItem[] = [];
  isVisible = false;

  private search$ = new Subject<string>();

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.search$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((q) =>
          q.length < 3 ? of([]) : this.animeService.getList(20, q)
        )
      )
      .subscribe((results) => {
        this.suggestions = results;
        this.isVisible = true;
      });
  }

  onInput(): void {
    if (!this.query.trim()) {
      this.suggestions = [];
      return;
    }
    this.search$.next(this.query);
  }

  selectAnime(anime: AnimeListItem): void {
    this.query = anime.title;
    this.isVisible = false;
    this.suggestions = [];
    this.animeSelected.emit(anime);
  }

  ngOnDestroy(): void {
    this.search$.complete();
  }
}
