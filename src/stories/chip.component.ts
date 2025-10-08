import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-chip',
    standalone: true,
    imports: [CommonModule],
  template: `    <div class="chip" [class.disabled]="disabled">
      <!-- Leading Icon -->
      <ng-container *ngIf="leadingIcon">
        <i [ngClass]="leadingIcon" class="chip-icon-right leading"></i>
      </ng-container>

      <!-- Label -->
      <span class="chip-label">{{ label }}</span>

      <!-- Trailing Icon -->
      <ng-container *ngIf="trailingIcon">
        <i [ngClass]="trailingIcon" class="chip-icon-left trailing"></i>
      </ng-container>
    </div>
`,
})
export class ChipComponent {
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() leadingIcon?: string;   // label-ku munnadi
  @Input() trailingIcon?: string;  // label-ku pinnadi
}
