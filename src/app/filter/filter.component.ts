import { Component, Input, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { ProducerService } from '../../services/producer.service';
import { TypeService } from '../../services/type.service';
import { SourceService } from '../../services/source.service';
import {
  Genre,
  Licensor,
  Producer,
  Source,
  Type,
} from '../../interfaces/anime';
import { LicensorService } from '../../services/licensor.service';
import { AnimeSearchParameters } from '../../interfaces/anime-search-parameters';
import { AnimeService } from '../../services/anime.service';
import { Params, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  genres: Genre[] = [];
  producers: Producer[] = [];
  licensors: Licensor[] = [];
  types: Type[] = [];
  sources: Source[] = [];
  isOpen: boolean = false;

  @Input() filter: AnimeSearchParameters = {
    producer_id: null,
    licensor_id: null,
    genreId: null,
    type: null,
    source: null,
    min_score: null,
    min_release_year: null,
    episodes: null,
    include_adult_content: false,
  };

  constructor(
    private animeService: AnimeService,
    private genreService: GenreService,
    private producerService: ProducerService,
    private licensorService: LicensorService,
    private typeService: TypeService,
    private sourceService: SourceService,
    private router: Router
  ) {}
  ngOnInit(): void {
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
    const header = document.querySelector('header');

    if (header?.classList.contains('hidden')) {
      header.classList.remove('hidden');
    } else {
      header?.classList.add('hidden');
    }
  }

  applyFilters(): void {
    this.toggleMenu();
    this.router.navigate(['/search'], {
      queryParams: { ...this.filter } as Params,
    });
  }
}
