import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'storybook-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        [ngClass]="cssclass"
        [id]="id"
        [name]="name"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)"
        (blur)="onTouchedFn()">
      <label class="form-check-label" [for]="id">
        {{ label }}
      </label>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
  }]
})
export class RadioButtonComponent implements ControlValueAccessor {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() cssclass = '';
  @Input() label = 'Radio';
  @Input() value: any;
  @Input() name = 'radioGroup'; 
  @Input() id = Math.random().toString(36).substring(2);

  @Output() checkedChange = new EventEmitter<boolean>();

  private onChangeFn: (val: any) => void = () => {};
  onTouchedFn: () => void = () => {};

  writeValue(value: any): void {
    this.checked = value === this.value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
    if (this.checked) {
      this.onChangeFn(this.value); // <-- propagate value to form
    }
  }
}
