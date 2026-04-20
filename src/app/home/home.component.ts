import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AnimeService } from '../../services/http/anime/anime.service';
import { Anime } from '../../interfaces/anime';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private animeService: AnimeService,
    private router: Router,
  ) {}

  @ViewChild('sentinel') sentinel!: ElementRef;

  private page: number = 1;
  private initialPageSize: number = 33;
  private stepSize: number = 12;

  private loadedImages: Set<number> = new Set();
  private observer!: IntersectionObserver;

  recentAnime: Anime[] = [];
  counter: number[] = Array(this.initialPageSize);
  stepCounter: number[] = Array(this.stepSize);
  loading: boolean = false;
  allLoaded: boolean = false;

  ngOnInit(): void {
    this.loadRecentAnime();
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((e) => e.isIntersecting) &&
          !this.loading &&
          !this.allLoaded
        ) {
          this.loadRecentAnime();
        }
      },
      { rootMargin: '200px' },
    );
    this.observer.observe(this.sentinel.nativeElement);
  }

  public onImageLoad(id: number) {
    this.loadedImages.add(id);
  }

  public isImageLoaded(id: number): boolean {
    return this.loadedImages.has(id);
  }

  private loadRecentAnime() {
    this.loading = true;
    const size = this.recentAnime.length ? this.stepSize : this.initialPageSize;

    this.animeService.getPaginatedRecents(this.page + 1, size).subscribe({
      next: (data) => {
        this.page++;
        if (!data.has_next_page) {
          this.allLoaded = true;
        }
        this.recentAnime = this.recentAnime.concat(data.data);
      },
      error: (err) => {
        if (err.status >= 500 || err.status == 0) {
          this.router.navigate(['/error'], {
            state: { status: err.status },
          });
        }
      },
      complete: () => (this.loading = false),
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
