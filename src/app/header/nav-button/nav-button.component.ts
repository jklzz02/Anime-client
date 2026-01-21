import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-button',
  templateUrl: './nav-button.component.html',
  standalone: false,
})
export class NavButtonComponent {
  @Input() route!: string | any[];
  @Input() fragment?: string;
  @Input() exact: boolean = true;
  @Input() mobile: boolean = false;


  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
