import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-dropdown-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="dropdown-list">
      <li *ngFor="let option of options">
        <i class="fa-solid" [ngClass]="getIcon(option)"></i>
        {{ option }}
      </li>
    </ul>
  `,
})
export class DropdownlistComponent {
  getIcon(option: string): string {
    if (option.toLowerCase().includes('edit')) return 'fa-pen-to-square';
    if (option.toLowerCase().includes('delete')) return 'fa-trash';
    return '';
  }
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select';
  // Only default and hover states, no selection logic
}
