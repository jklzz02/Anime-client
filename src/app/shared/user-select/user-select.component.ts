import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { PublicUser } from '../../../interfaces/public-user';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-select',
  standalone: false,
  templateUrl: './user-select.component.html',
  styleUrl: './user-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true,
    },
  ],
})
export class UserSelectComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Search users...';
  @Output() userSelected = new EventEmitter<PublicUser | undefined>();

  query = '';
  suggestions: PublicUser[] = [];
  selectedUser?: PublicUser;
  isVisible = false;
  isLoading = false;
  disabled = false;

  private warmCache: PublicUser[] = [];
  private searchSubject = new Subject<string>();
  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserList(300, null)
      .subscribe((data) => (this.warmCache = data));

    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.performSearch(query)),
      )
      .subscribe((results) => {
        this.suggestions = results;
        this.isLoading = false;
      });
  }

  writeValue(value: any): void {
    if (value === null || value === undefined) {
      this.clear();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(): void {
    const trimmed = this.query.trim();

    if (!trimmed) {
      this.suggestions = [];
      this.isVisible = false;
      return;
    }

    this.isVisible = true;
    this.isLoading = true;
    this.searchSubject.next(trimmed);
  }

  private performSearch(query: string) {
    if (!query) {
      return of([]);
    }

    if (query.length < 3) {
      const filtered = this.warmCache.filter((user) =>
        this.matchesQuery(user, query),
      );
      return of(filtered.slice(0, 10));
    }

    return this.userService.getUserList(10, query);
  }

  private matchesQuery(user: PublicUser, query: string): boolean {
    const lowerQuery = query.toLowerCase();
    return user.username.toLowerCase().includes(lowerQuery);
  }

  selectUser(user: PublicUser): void {
    this.selectedUser = user;
    this.query = user.username;
    this.isVisible = false;
    this.suggestions = [];

    this.onChange(user.id);
    this.userSelected.emit(user);
  }

  clear(): void {
    this.selectedUser = undefined;
    this.query = '';
    this.isVisible = false;
    this.suggestions = [];

    this.onChange(null);
    this.userSelected.emit(undefined);
  }

  onBlur(): void {
    this.onTouched();

    setTimeout(() => {
      this.isVisible = false;
    }, 200);
  }

  onFocus(): void {
    if (this.query && this.suggestions.length > 0) {
      this.isVisible = true;
    }
  }
}
