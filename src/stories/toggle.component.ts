import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'storybook-toggle-switch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-check form-switch custom-toggle">
      <input 
        class="form-check-input" 
        type="checkbox"
        [ngClass]="cssclass"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onInputChange($event)">
      <label class="form-check-label">
        {{ label }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true
    }
  ]
})
export class ToggleSwitchComponent implements ControlValueAccessor {
  @Input() checked = false; // initial state from parent
  @Input() disabled = false;
  @Input() cssclass = '';
  @Input() label = 'Toggle Switch';
  @Output() checkedChange = new EventEmitter<boolean>();

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};
  writeValue(value: boolean): void {
    if (value !== undefined) {
      this.checked = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

onInputChange(event: Event) {
  const input = event.target as HTMLInputElement; 
  const value = input.checked;
  this.checked = value;
  this.onChange(value); 
  this.onTouched();
  this.checkedChange.emit(value);
}
}
