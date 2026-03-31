import {
  Component,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { PaginatedResult } from '../../../../interfaces/paginated-result';
import { TableColumn } from '../../shared/interfaces/table-column';
import { AnimeListItem } from '../../../../interfaces/anime-list-item';
import { AnimeService } from '../../../../services/http/anime/anime.service';
import { finalize } from 'rxjs';
import { AdminStateService } from '../../services/state/admin-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-dashboard',
  standalone: false,
  templateUrl: './anime-dashboard.component.html',
  styleUrl: './anime-dashboard.component.css',
})
export class AnimeDashboardComponent implements OnInit, AfterViewInit {
  anime: PaginatedResult<AnimeListItem> | null = null;
  columns: TableColumn<AnimeListItem>[] = [];

  currentPage = 1;
  pageSize = 30;
  hasNextPage = false;
  maxPage = 0;

  @ViewChild('titleTpl') titleTpl!: TemplateRef<{ $implicit: AnimeListItem }>;

  constructor(
    private animeService: AnimeService,
    private adminStateService: AdminStateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const state = this.adminStateService.getAnimeDashboardState();
    this.currentPage = state.currentPage ?? 1;
    this.pageSize = state.pageSize ?? 30;
    this.loadAnime();
  }

  ngAfterViewInit(): void {
    this.columns = [
      {
        key: 'id',
        header: 'ID',
        accessor: (anime) => '#' + anime.id,
        cellClass: 'opacity-70 w-16',
      },
      {
        key: 'title',
        header: 'Title',
        template: this.titleTpl,
      },
      {
        key: 'english_title',
        header: 'English Title',
        accessor: (anime) => anime.english_title ?? '—',
        cellClass: 'opacity-70',
      },
    ];
  }

  animeRowLink = (anime: AnimeListItem) => ['/admin/anime', anime.id];

  loadAnime(): void {
    this.animeService
      .getPaginatedListItems(this.currentPage, this.pageSize)
      .pipe(
        finalize(() => {
          this.adminStateService.updateAnimeDashboardState({
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          });
        }),
      )
      .subscribe({
        next: (data) => {
          this.anime = data;
          this.hasNextPage = data.has_next_page;
          this.maxPage = data.total_pages;
        },
        error: (err) => {
          this.router.navigate(['/error'], {
            state: { status: err.status, message: err.message },
          });
        },
      });
  }

  onNextPage(): void {
    this.currentPage = this.hasNextPage ? this.currentPage + 1 : 1;
    this.loadAnime();
  }

  onPreviousPage(): void {
    this.currentPage =
      this.currentPage === 1 ? this.maxPage : this.currentPage - 1;
    this.loadAnime();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.adminStateService.updateAnimeDashboardState({
      pageSize: this.pageSize,
    });

    this.loadAnime();
  }
}
