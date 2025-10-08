import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-finite',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Category chip -->
    <div
      class="finite-chip"
      [ngClass]="normalize(category)"
      *ngIf="type === 'category'">
      {{ label }}
    </div>

    <!-- Query chip -->
    <div
      class="query-chip"
      [ngClass]="normalize(status)"
      *ngIf="type === 'query'">
      {{ label }}
    </div>
  `,
})
export class FiniteChipComponent {
  /** Type: 'category' or 'query' */
  @Input() type: 'category' | 'query' = 'category';

  /** Category names: sales, financial, business, revenue, technology */
  @Input() category?: string;

  /** Query status names: inprogress, response, inactive, resolution, raised */
  @Input() status?: string;

  /** Label to display */
  @Input() label: string = '';

  // normalize function: make first letter uppercase
  normalize(value?: string): string {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
