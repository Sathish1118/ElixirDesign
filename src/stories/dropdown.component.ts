import { Component, Input, Output, EventEmitter, HostListener, ElementRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type DropdownOption = {
  label: string;
  value: string;
  count?: string;
};

@Component({
  selector: 'storybook-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="position-relative" [class.open]="isOpen">
    <button type="button"
            class="trigger w-100 d-flex justify-content-between align-items-center p-2"
            [ngClass]="borderClass"
            (click)="toggle()"
            aria-haspopup="listbox"
            [attr.aria-expanded]="isOpen">
      <span>{{ displayLabel }}</span>
      <i class="fa-solid fa-angle-down"></i>
    </button>

    <ul class="menu position-absolute mt-1 ps-0 start-0 end-0" 
        style="max-height:150px; overflow:auto; z-index:10;" 
        role="listbox" *ngIf="isOpen">
      <li *ngFor="let opt of normalizedOptions; let i = index"
          class="p-2 menu-item"
          [class.active]="isSelected(opt)"
          [attr.data-index]="i"
          (click)="onItemClick(opt, $event)">
        
        <!-- Checkbox mode -->
        <span *ngIf="mode === 'checkbox'" class="d-flex align-items-center item-label">
          <input type="checkbox" class="form-check-input" [checked]="isSelected(opt)"
                 (change)="$event.stopPropagation(); onCheckboxChange(opt, $event)" />
          <span class="label-text ms-2">{{ opt.label }}</span>
        </span>

        <!-- Radio mode -->
        <span *ngIf="mode === 'radio'" class="item-label">
          <input type="radio" class="form-check-input" name="sb-dropdown-{{_uid}}" 
                 [checked]="isSelected(opt)" 
                 (change)="$event.stopPropagation(); onRadioChange(opt)" />
          <span class="label-text ms-2">{{ opt.label }}</span>
        </span>

        <!-- Default mode -->
        <span *ngIf="mode === 'default'" class="d-flex justify-content-between align-items-center">
          <span class="label-text">
            <span *ngIf="showIndex" class="fw-bold">{{ i + 1 }} </span>{{ opt.label }}
          </span>
          <span *ngIf="showBadge" class="inputbadge ms-2">{{ opt.count }}</span>
        </span>
      </li>
    </ul>
  </div>
  `,
  styles: [``],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StorybookDropdownComponent),
      multi: true
    }
  ]
})
export class StorybookDropdownComponent implements ControlValueAccessor {
  @Input() options: Array<string | DropdownOption> = [];
  @Input() placeholder: string = 'Select...';
  @Input() mode: 'default' | 'checkbox' | 'radio' = 'default';
  @Input() showIndex: boolean = false;
  @Input() showBadge: boolean = false;
  @Input() border: 'default' | 'invalid' = 'default';
  @Output() selected = new EventEmitter<string | string[]>();

  _uid = Math.random().toString(36).slice(2, 9);
  private _selectedValues = new Set<string>();
  isOpen = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private el: ElementRef) {}

  // Normalize string options into objects
  get normalizedOptions(): DropdownOption[] {
    return this.options.map(o => 
      typeof o === 'string' ? { label: o, value: o } : { label: o.label, value: o.value ?? o.label, count: o.count }
    );
  }

  // Display selected label(s)
  get displayLabel(): string {
    const selected = Array.from(this._selectedValues);
    if (!selected.length) return this.placeholder;
    if (this.mode === 'checkbox') return selected.join(', ');
    return this.normalizedOptions.find(o => o.value === selected[0])?.label ?? this.placeholder;
  }

  get borderClass() {
    return this.border === 'invalid' ? 'border-danger' : '';
  }

  // Toggle dropdown open/close
  toggle() { this.isOpen = !this.isOpen; }
  close() { this.isOpen = false; }

  // Selection handlers
  onItemClick(opt: DropdownOption, event?: Event) {
    if (this.mode === 'checkbox') {
      this.toggleSelection(opt.value);
    } else {
      this._selectedValues.clear();
      this._selectedValues.add(opt.value);
      this.emitSelection();
      this.close();
    }
    this.onTouched();
  }

  onCheckboxChange(opt: DropdownOption, ev: Event) {
    ev.stopPropagation();
    const input = ev.target as HTMLInputElement;
    if (input.checked) this._selectedValues.add(opt.value);
    else this._selectedValues.delete(opt.value);
    this.emitSelection();
    this.onTouched();
  }

  onRadioChange(opt: DropdownOption) {
    this._selectedValues.clear();
    this._selectedValues.add(opt.value);
    this.emitSelection();
    this.close();
    this.onTouched();
  }

  toggleSelection(value: string) {
    if (this._selectedValues.has(value)) this._selectedValues.delete(value);
    else this._selectedValues.add(value);
    this.emitSelection();
  }

  isSelected(opt: DropdownOption) {
    return this._selectedValues.has(opt.value);
  }

  emitSelection() {
    const val = this.mode === 'checkbox' ? Array.from(this._selectedValues) : Array.from(this._selectedValues)[0] ?? '';
    this.selected.emit(val);
    this.onChange(val);
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this._selectedValues.clear();
    if (value != null) {
      if (Array.isArray(value)) value.forEach(v => this._selectedValues.add(v));
      else this._selectedValues.add(value);
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void { }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      if (this.isOpen) this.onTouched(); // mark touched if clicking outside
      this.close();
    }
  }
}

