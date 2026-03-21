import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import {
  ReviewSearchParameters,
  ReviewSortField,
} from '../../../interfaces/review-search-parameters';
import { AnimeListItem } from '../../../interfaces/anime-list-item';
import { PublicUser } from '../../../interfaces/public-user';

@Component({
  selector: 'app-review-filter',
  standalone: false,
  templateUrl: './review-filter.component.html',
  styleUrl: './review-filter.component.css',
})
export class ReviewFilterComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;

  sortFields: { key: string; value: ReviewSortField }[] = [
    { key: 'ID', value: 'id' },
    { key: 'Title', value: 'title' },
    { key: 'Score', value: 'score' },
    { key: 'Date', value: 'date' },
  ];

  sortOrdersArray: { key: string; value: 'asc' | 'desc' }[] = [
    { key: 'Ascending', value: 'asc' },
    { key: 'Descending', value: 'desc' },
  ];

  sortFieldValueFn = (field: { key: string; value: ReviewSortField }) =>
    field.value;
  sortFieldLabelFn = (field: { key: string; value: ReviewSortField }) =>
    field.key;

  sortOrderValueFn = (order: { key: string; value: string }) => order.value;
  sortOrderLabelFn = (order: { key: string; value: string }) => order.key;

  @Input() filter: Partial<ReviewSearchParameters> = {
    title: null,
    anime_id: null,
    anime_title: null,
    user_id: null,
    user_name: null,
    from: null,
    to: null,
    min_score: null,
    max_score: null,
    oder_by: null,
    sort_order: 'desc',
  };

  private body!: HTMLElement;
  private header!: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.body = this.document.body;
    this.header = this.document.querySelector('header')!;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isOpen = false;
        const header = this.document.querySelector('header');
        if (header?.classList.contains('hidden')) {
          header.classList.remove('hidden');
        }
      });
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    if (this.body.classList.contains('overflow-y-clip')) {
      this.body.classList.remove('overflow-y-clip');
    } else {
      this.body.classList.add('overflow-y-clip');
    }

    if (this.header.classList.contains('z-40')) {
      this.header.classList.remove('z-40');
    } else {
      this.header.classList.add('z-40');
    }
  }

  onAnimeSelected(anime: AnimeListItem | undefined): void {
    this.filter.anime_id = anime?.id ?? null;
    this.filter.anime_title = anime?.title ?? null;
  }

  onUserSelected(user: PublicUser | undefined): void {
    this.filter.user_id = user?.id ?? null;
    this.filter.user_name = user?.username ?? null;
  }

  applyFilters(): void {
    this.toggleMenu();
    this.router.navigate(['/reviews/search'], {
      queryParams: { ...this.filter } as Params,
    });
  }

  clearFilters(): void {
    this.filter = {};
  }

  ngOnDestroy(): void {
    this.isOpen = false;
    this.body.classList.remove('overflow-y-clip');
    this.header.classList.add('z-40');
  }
}
