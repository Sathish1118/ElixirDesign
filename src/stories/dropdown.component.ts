import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      <button class="trigger w-100 d-flex justify-content-between align-items-center p-2" (click)="toggle()" aria-haspopup="listbox" [attr.aria-expanded]="isOpen">
        <span>{{ displayLabel }}</span>
        <i class="fa-solid fa-angle-down "></i>
      </button>
      <ul class="menu position-absolute mt-1 ps-0 start-0 end-0 " style="max-height:150px;overflow:auto;z-index:10;" role="listbox" *ngIf="isOpen">
        <li *ngFor="let opt of normalizedOptions; let i = index"
            class="p-2 menu-item"
            [class.active]="isSelected(opt)"
            [attr.data-index]="i"
            (click)="onItemClick(opt, $event)">
          <span *ngIf="mode === 'checkbox'" class="d-flex align-items-center item-label">
            <input type="checkbox"  class="form-check-input"  [checked]="isSelected(opt)" (change)="$event.stopPropagation(); onCheckboxChange(opt, $event)" />
            <span class="label-text ms-2">{{ opt.label }}</span>
          </span>
          <span *ngIf="mode === 'radio'" class="item-label">
            <input type="radio"  class="form-check-input" name="sb-dropdown-{{_uid}}" [checked]="isSelected(opt)" (change)="$event.stopPropagation(); onRadioChange(opt)" />
            <span class="label-text ms-2">{{ opt.label }}</span>
          </span>
          <!-- <span *ngIf="mode === 'default'" class="label-text">{{ opt.label }}</span> -->
           <span *ngIf="mode === 'default'" class="d-flex justify-content-between align-items-center">
 <span class="label-text">
      <span *ngIf="showIndex" class="fw-bold">{{ i + 1 }} </span>{{ opt.label }}
    </span><span *ngIf="showBadge" class="inputbadge ms-2">{{ opt.count }}</span>
</span>

        </li>
      </ul>
    </div>
  `,
  styles: [
    `
  
    `
  ]
})
export class StorybookDropdownComponent {
  @Input() options: Array<string | DropdownOption> = [];
  @Input() placeholder: string = 'Select...';
  @Input() header?: string;
  @Input() mode: 'default' | 'checkbox' | 'radio' = 'default';
  @Output() selected = new EventEmitter<string | string[]>();
  isOpen = false;
  @Input() showIndex: boolean = false; // optional index display

  _uid = Math.random().toString(36).slice(2, 9);
  private _selectedValues = new Set<string>();
@Input() showBadge: boolean = false; // optional badge toggle

  constructor(private el: ElementRef) {}
get selectedCount(): number {
  return this._selectedValues.size;
}

  // get normalizedOptions(): Array<{ label: string; value: string }> {
  //   return this.options.map(o => typeof o === 'string' ? { label: o, value: o } : o);
  // }
get normalizedOptions(): DropdownOption[] {
  return this.options.map(o => {
    if (typeof o === 'string') return { label: o, value: o };
    return {
      label: o.label,
      value: o.value ?? o.label, // if value missing, fallback to label
      count: o.count
    };
  });
}


  get displayLabel(): string {
    const selected = Array.from(this._selectedValues);
    if (selected.length === 0) return this.placeholder;
    if (this.mode === 'checkbox') return selected.join(', ');
    return this.normalizedOptions.find(o => o.value === selected[0])?.label ?? this.placeholder;
  }

  toggle() { this.isOpen = !this.isOpen; }

  close() { this.isOpen = false; }

  onItemClick(opt: { label: string; value: string }, event?: Event) {
    if (this.mode === 'checkbox') {
      this.toggleSelection(opt.value);
    } else if (this.mode === 'radio') {
      this._selectedValues.clear();
      this._selectedValues.add(opt.value);
      this.emitSelection();
      this.close();
    } else {
      this._selectedValues.clear();
      this._selectedValues.add(opt.value);
      this.emitSelection();
      this.close();
    }
  }

  onCheckboxChange(opt: { label: string; value: string }, ev: Event) {
    ev.stopPropagation();
    const input = ev.target as HTMLInputElement;
    if (input.checked) this._selectedValues.add(opt.value);
    else this._selectedValues.delete(opt.value);
    this.emitSelection();
  }

  onRadioChange(opt: { label: string; value: string }) {
    this._selectedValues.clear();
    this._selectedValues.add(opt.value);
    this.emitSelection();
    this.close();
  }

  toggleSelection(value: string) {
    if (this._selectedValues.has(value)) this._selectedValues.delete(value);
    else this._selectedValues.add(value);
    this.emitSelection();
  }

  isSelected(opt: { label: string; value: string }) {
    return this._selectedValues.has(opt.value);
  }
  emitSelection() {
    if (this.mode === 'checkbox') {
      this.selected.emit(Array.from(this._selectedValues));
    } else {
      this.selected.emit(Array.from(this._selectedValues)[0] ?? '');
    }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) this.close();
  //    if (!this.el.nativeElement.contains(event.target) && this.mode !== 'checkbox') {
  //   this.close();
  // }
  }
}