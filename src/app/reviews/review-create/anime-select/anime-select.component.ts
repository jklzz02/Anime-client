import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AnimeListItem } from '../../../../interfaces/anime-list-item';
import { AnimeService } from '../../../../services/http/anime/anime.service';

@Component({
  selector: 'app-anime-select',
  standalone: false,
  templateUrl: './anime-select.component.html',
  styleUrl: './anime-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnimeSelectComponent),
      multi: true,
    },
  ],
})
export class AnimeSelectComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Search anime...';
  @Output() animeSelected = new EventEmitter<AnimeListItem | undefined>();

  query = '';
  suggestions: AnimeListItem[] = [];
  selectedAnime?: AnimeListItem;
  isVisible = false;
  isLoading = false;
  disabled = false;

  private warmCache: AnimeListItem[] = [];
  private searchSubject = new Subject<string>();
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.animeService.getList(300).subscribe((data) => (this.warmCache = data));

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.performSearch(query)),
      )
      .subscribe((results) => {
        this.suggestions = results;
        this.isLoading = false;
      });
  }

  writeValue(value: any): void {
    if (value === null || value === undefined) {
      this.clear();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(): void {
    const trimmed = this.query.trim();

    if (!trimmed) {
      this.suggestions = [];
      this.isVisible = false;
      return;
    }

    this.isVisible = true;
    this.isLoading = true;
    this.searchSubject.next(trimmed);
  }

  private performSearch(query: string) {
    if (!query) {
      return of([]);
    }

    if (query.length < 3) {
      const filtered = this.warmCache.filter((anime) =>
        this.matchesQuery(anime, query),
      );
      return of(filtered.slice(0, 10));
    }

    return this.animeService.getList(10, query);
  }

  private matchesQuery(anime: AnimeListItem, query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return (
      anime.title.toLowerCase().includes(lowerQuery) ||
      anime.english_title?.toLowerCase().includes(lowerQuery) ||
      false
    );
  }

  selectAnime(anime: AnimeListItem): void {
    this.selectedAnime = anime;
    this.query = anime.title;
    this.isVisible = false;
    this.suggestions = [];

    this.onChange(anime.id);
    this.animeSelected.emit(anime);
  }

  clear(): void {
    this.selectedAnime = undefined;
    this.query = '';
    this.isVisible = false;
    this.suggestions = [];

    this.onChange(null);
    this.animeSelected.emit(undefined);
  }

  onBlur(): void {
    this.onTouched();

    setTimeout(() => {
      this.isVisible = false;
    }, 200);
  }

  onFocus(): void {
    if (this.query && this.suggestions.length > 0) {
      this.isVisible = true;
    }
  }
}
