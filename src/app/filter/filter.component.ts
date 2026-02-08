import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { GenreService } from '../../services/http/genre/genre.service';
import { ProducerService } from '../../services/http/producer/producer.service';
import { TypeService } from '../../services/http/type/type.service';
import { SourceService } from '../../services/http/source/source.service';
import {
  Genre,
  Licensor,
  Producer,
  Source,
  Type,
} from '../../interfaces/anime';
import { LicensorService } from '../../services/http/licensor/licensor.service';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { NavigationEnd, Params, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit, OnDestroy {
  genres: Genre[] = [];
  genreNames: string[] = [];
  producers: Producer[] = [];
  producerNames: string[] = [];
  licensors: Licensor[] = [];
  licensorNames: string[] = [];
  types: Type[] = [];
  sources: Source[] = [];
  isOpen: boolean = false;
  sortOrders = {
    Ascending: 'asc',
    Descending: 'desc',
  };

  sortFields: string[] = ['Title', 'Year', 'Score', 'Release Date', 'Episodes'];

  statuses = [
    { name: 'Finished Airing' },
    { name: 'Currently Airing' },
    { name: 'Not yet aired' },
  ];

  sortOrdersArray = [
    { key: 'Ascending', value: 'asc' },
    { key: 'Descending', value: 'desc' },
  ];

  typeFn = (type: any) => type.name;
  statusFn = (status: any) => status.name;
  sourceFn = (source: any) => source.name;

  sortFieldValueFn = (field: string) => field.toLowerCase().replace(' ', '_');
  sortFieldLabelFn = (field: string) => field;

  sortOrderValueFn = (order: any) => order.value;
  sortOrderLabelFn = (order: any) => order.key;

  @Input() filter: Partial<AnimeSearchParameters> = {
    producer_id: null,
    licensor_id: null,
    genre_id: null,
    genres: [],
    licensors: [],
    producers: [],
    status: '',
    rating: '',
    type: '',
    source: '',
    min_score: null,
    min_release_year: null,
    episodes: null,
    include_adult_content: null,
    order_by: 'score',
    sort_order: 'desc',
  };

  private body: HTMLElement | null = null;
  private header: HTMLElement | null = null;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private genreService: GenreService,
    private producerService: ProducerService,
    private licensorService: LicensorService,
    private typeService: TypeService,
    private sourceService: SourceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.body = this.document.body;
    this.header = this.document.querySelector('header')!;

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isOpen = false;
        const header = this.document.querySelector('header');

        if (header?.classList.contains('hidden')) {
          header.classList.remove('hidden');
        }
      });

    this.genreService.getGenres().subscribe((data) => {
      this.genres = data;
      this.genreNames = data.map((genre) => genre.name).sort();
    });

    this.producerService.getProducers().subscribe((data) => {
      this.producers = data;
      this.producerNames = data.map((producer) => producer.name).sort();
    });

    this.licensorService.getLicensors().subscribe((data) => {
      this.licensors = data;
      this.licensorNames = data.map((licensor) => licensor.name).sort();
    });

    this.typeService.getTypes().subscribe((data) => (this.types = data));

    this.sourceService.getSources().subscribe((data) => (this.sources = data));
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    if (this.body!.classList.contains('overflow-y-clip')) {
      this.body!.classList.remove('overflow-y-clip');
    } else {
      this.body!.classList.add('overflow-y-clip');
    }

    if (this.header!.classList.contains('z-40')) {
      this.header!.classList.remove('z-40');
    } else {
      this.header!.classList.add('z-40');
    }
  }

  applyFilters(): void {
    this.toggleMenu();
    this.router.navigate(['/search'], {
      queryParams: { ...this.filter } as Params,
    });
  }

  clearFilters(): void {
    this.filter = {};
  }

  ngOnDestroy(): void {
    this.isOpen = false;

    this.body!.classList.remove('overflow-y-clip');
    this.header!.classList.add('z-40');
  }
}
