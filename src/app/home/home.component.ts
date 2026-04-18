import {
  AfterViewInit,
  Component,
  ElementRef,
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
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private animeService: AnimeService,
    private router: Router,
  ) {}

  @ViewChild('sentinel') sentinel!: ElementRef;

  private loadCount: number = 33;
  private stepCount: number = 12;
  private loadedImages: Set<number> = new Set();
  private observer!: IntersectionObserver;

  recentAnime: Anime[] = [];
  counter: number[] = Array(this.loadCount);
  stepCounter: number[] = Array(this.stepCount);
  loading: boolean = false;
  allLoaded: boolean = false;

  ngOnInit(): void {
    this.loadRecentAnime(this.loadCount);
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (
          entries.some((e) => e.isIntersecting) &&
          !this.loading &&
          !this.allLoaded
        ) {
          this.loadMore();
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

  public loadMore() {
    this.loadCount += this.stepCount;
    this.loadRecentAnime(this.loadCount);
  }

  private loadRecentAnime(count: number) {
    this.loading = true;

    this.animeService.getRecent(count).subscribe({
      next: (data) => {
        if (data.length < this.loadCount) {
          this.allLoaded = true;
        }
        this.recentAnime = data;
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
}
