import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ThemeService, Theme } from '../../services/theme/theme.service';
import { debounceTime, fromEvent, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { UserService, User } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHeaderHidden: boolean = false;
  isLoggedIn: boolean = false;
  isUserMenuOpen = false;
  currentTheme: Theme = 'light';
  user: Partial<User> = {};

  private lastScrollTop = 0;
  private scrollSub?: Subscription;
  private themeSub?: Subscription;

  constructor(
    private themeService: ThemeService,
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
      if (isAuth) {
        this.userService.getCurrentUser().subscribe((user) => {
          this.user = user;
        });
      }
    });

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

  signOut() {
    this.auth.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.isUserMenuOpen = false;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.isUserMenuOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.themeSub?.unsubscribe();
    this.scrollSub?.unsubscribe();
  }
}
