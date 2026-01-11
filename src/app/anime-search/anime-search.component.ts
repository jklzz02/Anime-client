import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimeService } from '../../services/http/anime.service';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { AnimeListItem } from '../../interfaces/anime-list-item';

@Component({
  selector: 'app-anime-search',
  standalone: false,
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.css',
})
export class AnimeSearchComponent implements OnInit, OnDestroy {
  constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  warmAnimeList: AnimeListItem[] = [];
  suggestions: AnimeListItem[] | any = [];

  isVisible: boolean = false;
  params: Partial<AnimeSearchParameters> = {
    order_by: 'score',
    sort_order: 'desc',
  };

  private searchSubject = new Subject<string>();

  ngOnInit(): void {
    this.animeService
      .getList(300)
      .subscribe((data) => (this.warmAnimeList = data));

    this.route.queryParams.subscribe((params) => {
      this.params = { ...params };
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isVisible = false;
        this.params.query = '';
        this.suggestions = [];
      });

    this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((query) => {
          const q = query.trim();

          if (!q) {
            return of([]);
          }

          if (q.length < 3) {
            return of(
              this.warmAnimeList.filter(
                (a) =>
                  a.title.toLowerCase().includes(q.toLowerCase()) ||
                  a.english_title?.toLowerCase().includes(q.toLowerCase())
              )
            );
          }

          return this.animeService.getList(300, q);
        })
      )
      .subscribe((results) => {
        this.suggestions = results.map((a) => ({
          ...a,
          loaded: false,
        }));
      });
  }

  onSearch(): void {
    this.isVisible = true;
    const query = this.params.query?.trim() || '';

    if (!query) {
      this.suggestions = [];
      return;
    }

    this.searchSubject.next(query);
  }

  onSearchBlur(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (relatedTarget && relatedTarget.hasAttribute('data-suggestion')) {
      return;
    }
    if (relatedTarget && relatedTarget.hasAttribute('data-submit')) {
      this.isVisible = false;
      return;
    }
    this.params.query = '';
    this.isVisible = false;
    this.suggestions = [];
  }

  searchSubmit(): void {
    if (!this.params.query?.trim()) {
      return;
    }
    this.router.navigate(['/search'], {
      queryParams: { ...this.params } as Params,
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }
}
