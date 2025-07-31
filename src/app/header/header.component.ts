import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'light';
  private themeSub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeSub = this.themeService.theme$.subscribe((theme) => {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
    });
  }

  isMenuOpen: boolean = false;

  public onThemeChange(event: Event): void {
    console.log('called');
    const selectedTheme = (event.target as HTMLSelectElement).value as Theme;
    this.themeService.setTheme(selectedTheme);
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
  }
}
