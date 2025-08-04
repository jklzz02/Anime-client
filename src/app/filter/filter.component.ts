import { Component, OnInit } from '@angular/core';
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

  constructor(
    private genreService: GenreService,
    private producerService: ProducerService,
    private licensorService: LicensorService,
    private typeService: TypeService,
    private sourceService: SourceService
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
  }

  applyFilters(): void {}
}
