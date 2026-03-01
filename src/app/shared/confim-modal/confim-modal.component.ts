import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-confim-modal',
  standalone: false,
  templateUrl: './confim-modal.component.html',
  styleUrl: './confim-modal.component.css',
})
export class ConfimModalComponent implements OnChanges, OnDestroy {
  @Input() open: boolean = false;
  @Input() modalTitle: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Input() confirmMessage: string = 'Confirm';
  @Input() buttonColor: 'red' | 'green' = 'red';

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  open$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DOCUMENT) private dom: Document) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      this.open$.next(changes['open'].currentValue);
    }
  }

  ngOnInit(): void {
    this.open$.subscribe((isOpen) => {
      if (isOpen) {
        this.dom.body.classList.add('overflow-y-hidden');
      } else {
        this.dom.body.classList.remove('overflow-y-hidden');
      }
    });
  }

  get buttonClasses(): string {
    const colorMap = {
      red: 'bg-red-600 hover:bg-red-700',
      green: 'bg-green-600 hover:bg-green-700',
    };

    return `${colorMap[this.buttonColor]} px-4 py-2 text-white rounded-md transition-colors`;
  }

  onClose() {
    this.open$.next(false);
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
    this.close.emit();
  }

  ngOnDestroy(): void {
    if (this.dom.body.classList.contains('overflow-y-hidden')) {
      this.dom.body.classList.remove('overflow-y-hidden');
    }
  }
}
