import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { AnimeSummary } from '../../interfaces/anime-summary';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-anime-search',
  standalone: false,
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.css',
})
export class AnimeSearchComponent implements OnInit {
  constructor(private animeService: AnimeService, private router: Router) {}

  animeSummary: AnimeSummary[] = [];
  suggestions: AnimeSummary[] | any = [];
  isVisible: boolean = false;
  query: string = '';

  ngOnInit(): void {
    this.animeService
      .getSummaries(1000)
      .subscribe((data) => (this.animeSummary = data));

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isVisible = false;
        this.query = '';
      });
  }

  onSearch(): void {
    this.isVisible = true;

    if (!this.animeSummary.length) {
      this.suggestions = [];
      return;
    }

    const filtered = this.animeSummary
      .filter((a) =>
        a.title.toLowerCase().includes(this.query.toLowerCase().trim())
      )
      .slice(0, 100);

    this.suggestions = filtered.map((a) => ({
      ...a,
      loaded: false,
    }));
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

    this.query = '';
    this.isVisible = false;
  }
}
