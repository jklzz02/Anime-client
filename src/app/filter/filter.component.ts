import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GenreService } from '../../services/http/genre.service';
import { ProducerService } from '../../services/http/producer.service';
import { TypeService } from '../../services/http/type.service';
import { SourceService } from '../../services/http/source.service';
import {
  Genre,
  Licensor,
  Producer,
  Source,
  Type,
} from '../../interfaces/anime';
import { LicensorService } from '../../services/http/licensor.service';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  producers: Producer[] = [];
  licensors: Licensor[] = [];
  types: Type[] = [];
  sources: Source[] = [];
  isOpen: boolean = false;
  sortOrders = {
    Ascending: 'asc',
    Descending: 'desc',
  };

  sortFields: string[] = ['Title', 'Year', 'Score', 'Release Date'];

  private header = document.querySelector('header');
  private body = document.querySelector('body');

  @Input() filter: AnimeSearchParameters = {
    producer_id: null,
    licensor_id: null,
    genre_id: null,
    status: '',
    rating: '',
    type: '',
    source: '',
    min_score: null,
    min_release_year: null,
    episodes: null,
    include_adult_content: null,
  };

  constructor(
    private genreService: GenreService,
    private producerService: ProducerService,
    private licensorService: LicensorService,
    private typeService: TypeService,
    private sourceService: SourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOpen = false;
        const header = document.querySelector('header');

        if (header?.classList.contains('hidden')) {
          header.classList.remove('hidden');
        }
      });

    this.genreService.getGenres().subscribe((data) => (this.genres = data));

    this.producerService
      .getProducers()
      .subscribe((data) => (this.producers = data));

    this.licensorService
      .getLicensors()
      .subscribe((data) => (this.licensors = data));

    this.typeService.getTypes().subscribe((data) => (this.types = data));

    this.sourceService.getSources().subscribe((data) => (this.sources = data));
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    if (this.body?.classList.contains('overflow-y-clip')) {
      this.body.classList.remove('overflow-y-clip');
    } else {
      this.body?.classList.add('overflow-y-clip');
    }

    if (this.header?.classList.contains('z-40')) {
      this.header.classList.remove('z-40');
    } else {
      this.header?.classList.add('z-40');
    }
  }

  applyFilters(): void {
    this.router.navigate(['/search'], {
      queryParams: { ...this.filter } as Params,
    });
  }

  clearFilters(): void {
    this.filter = { title: this.filter.title };
    this.toggleMenu();
    this.router.navigate(['/explore']);
  }

  ngOnDestroy(): void {
    this.isOpen = false;
    this.body?.classList.remove('overflow-y-clip');
    this.header?.classList.add('z-40');
  }
}
