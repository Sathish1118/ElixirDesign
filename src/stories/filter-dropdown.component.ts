import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorybookSearchComponent } from './search.component';

@Component({
  selector: 'storybook-filter-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, StorybookSearchComponent],
  template: `
    <div class="dropdown-filter p-2 shadow-sm rounded">
      <storybook-search 
        [placeholder]="'Search...'"
        [(value)]="searchText"
        (search)="searchTextChange.emit(searchText)">
      </storybook-search>
      <div class="filter-options mt-2">
        <div 
          class="filter-row d-flex align-items-center p-1"
          [class.selected]="selectedValues[val]"
          *ngFor="let val of values"
          (click)="toggleValue(val)">
          <input type="checkbox" class="form-check-input me-2"
            [(ngModel)]="selectedValues[val]"
            (click)="$event.stopPropagation()">
          <span class="mt-1">{{ val }}</span>
        </div>
      </div>
      <div class="filter-actions d-flex justify-content-between mt-2">
        <button class="btn btn-sm btn-outline-primary" (click)="onReset.emit()">Reset</button>
        <button class="btn btn-sm btn-primary" (click)="onApply.emit(selectedValues)">Apply</button>
      </div>
    </div>
  `,
})
export class FilterDropdownComponent {
  @Input() values: string[] = [];
  @Input() selectedValues: { [key: string]: boolean } = {};
  @Input() searchText: string = '';
  @Output() searchTextChange = new EventEmitter<string>(); 
  @Output() onApply = new EventEmitter<{ [key: string]: boolean }>();
  @Output() onReset = new EventEmitter<void>();
  toggleValue(val: string) {
    this.selectedValues[val] = !this.selectedValues[val];
  }
}
