import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHeaderHidden: boolean = false;
  currentTheme: Theme = 'light';

  private lastScrollTop = 0;
  private scrollSub?: Subscription;
  private themeSub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.scrollSub = fromEvent(window, 'scroll')
      .pipe(debounceTime(10))
      .subscribe(() => this.handleScroll());

    this.currentTheme = this.themeService.currentTheme;
    this.themeSub = this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  isMenuOpen: boolean = false;

  public onThemeToggle(): void {
    const theme: Theme = this.currentTheme == 'light' ? 'dark' : 'light';
    this.themeService.setTheme(theme);
  }

  private handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollThreshold = 300;

    if (scrollTop > scrollThreshold) {
      if (scrollTop > this.lastScrollTop + 5 && !this.isHeaderHidden) {
        this.isHeaderHidden = true;
      } else if (scrollTop < this.lastScrollTop - 5 && this.isHeaderHidden) {
        this.isHeaderHidden = false;
      }
    } else {
      this.isHeaderHidden = false;
    }

    this.lastScrollTop = scrollTop;
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
    this.scrollSub?.unsubscribe();
  }
}
