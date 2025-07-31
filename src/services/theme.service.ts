import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';
const THEME_KEY = 'preferred-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor() {}

  themeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(
    this.loadStoredTheme()
  );

  readonly theme$ = this.themeSubject;

  private loadStoredTheme(): Theme {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null;

    if (!stored) {
      return 'light';
    }

    return stored;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }
}
