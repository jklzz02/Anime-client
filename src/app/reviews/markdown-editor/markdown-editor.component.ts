import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-markdown-editor',
  standalone: false,
  templateUrl: './markdown-editor.component.html',
  styleUrl: './markdown-editor.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkdownEditorComponent),
      multi: true,
    },
  ],
})
export class MarkdownEditorComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() maxLength = 5000;

  @ViewChild('textarea') textareaRef!: ElementRef<HTMLTextAreaElement>;

  value = '';
  disabled = false;
  activeTab: 'write' | 'preview' = 'write';

  onChange = (_: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
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

  updateValue(value: string) {
    this.value = value;
    this.onChange(value);
  }

  wrapSelection(prefix: string, suffix = prefix) {
    const textarea = this.textareaRef.nativeElement;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = this.value.slice(0, start);
    const selected = this.value.slice(start, end) || 'text';
    const after = this.value.slice(end);

    const newValue = before + prefix + selected + suffix + after;

    this.updateValue(newValue);

    const cursorStart = start + prefix.length;
    const cursorEnd = cursorStart + selected.length;

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  get previewContent(): string {
    return this.value.replace(
      />!\s?(.*?)\s?!</gs,
      '<span class="spoiler">$1</span>'
    );
  }
}
