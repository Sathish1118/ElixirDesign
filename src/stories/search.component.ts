import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'storybook-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-wrapper d-flex align-items-center">
  <input
    type="text"
    class="form-control border-0 shadow-none search-input"
    [placeholder]="placeholder"
    [(ngModel)]="value"
    (keyup.enter)="onSearch()" (input)="onSearch()"
  />
  <i class="fa-solid fa-magnifying-glass search-icon" ></i>
</div>

  `,
  styles: [`
   
  `]
})
export class StorybookSearchComponent {
  @Input() placeholder: string = 'Search...';
  @Input() value: string = '';
    @Output() valueChange = new EventEmitter<string>();  // 🔑 needed for [(value)]

  @Output() search = new EventEmitter<string>();

  onSearch() {
     this.valueChange.emit(this.value);
    this.search.emit(this.value);
  }
}
