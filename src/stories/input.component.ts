import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'storybook-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="position-relative">
      <i *ngIf="iconLeft"
         [class]="iconLeft"
         class="position-absolute top-50 start-0 translate-middle-y ms-3"></i>
      <input
        [placeholder]="placeholder"
        class="form-control"
    [ngClass]="[controlSizeClass, borderClass]"
        [disabled]="disabled"
        [type]="type"
        [ngStyle]="inputPaddingStyle"
        [value]="value"
        (input)="onInput($event)"
         (blur)="onBlur()"
      />
      <i *ngIf="iconRight"
         [class]="iconRight"
         class="position-absolute top-50 end-0 translate-middle-y me-3"></i>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() size: 'sm' | 'lg' | '' = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  value: string = '';
    @Input() border: 'default' | 'invalid' = 'default';

  onChange: any = () => {};
  onTouched: any = () => {};
  writeValue(val: any): void {
    this.value = val || '';
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
  onInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  get controlSizeClass() {
    if (this.size === 'sm') return 'form-control-sm';
    if (this.size === 'lg') return 'form-control-lg';
    return '';
  }
  get inputPaddingStyle() {
    const styles: any = {};
    if (this.iconLeft) styles['padding-left'] = '2.5rem';
    if (this.iconRight) styles['padding-right'] = '2.5rem';
    return styles;
  }
    get borderClass() {
    return this.border === 'invalid' ? 'border-danger' : '';
  }
onBlur() {
  this.onTouched();
}

}
