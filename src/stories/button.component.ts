import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'storybook-button',
  standalone: true,
  imports: [CommonModule],
  template: `
<button [ngClass]="computedClass" [disabled]="disabled">
  <ng-container *ngIf="icon && iconPosition === 'left'">
    <i [ngClass]="icon" class="btn-icon"></i>
    {{ label }}
  </ng-container>

  <ng-container *ngIf="!icon || iconPosition !== 'left'">
    {{ label }}
    <i *ngIf="icon && iconPosition === 'right'" [ngClass]="icon" class="btn-icon btn-icon-right"></i>
  </ng-container>
</button>

        <!-- <button [ngClass]="computedClass" [disabled]="disabled">
      <ng-container *ngIf="icon && iconPosition === 'left'">
        <i [ngClass]="icon" class="btn-icon"></i>
        {{ label }}
      </ng-container>
      <ng-container *ngIf="!icon || iconPosition !== 'left'">
        {{ label }}
        <i *ngIf="icon && iconPosition === 'right'" [ngClass]="icon" class="btn-icon btn-icon-right"></i>
      </ng-container>
    </button> -->
  `,
  styleUrls: ['./button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  @Input() primary = false;
  @Input() iconOnly = false;
  @Input() icon?: string; 
  @Input() backgroundColor?: string;
  @Input() disabled = false;
  @Input() label = 'Button';
  @Output() onClick = new EventEmitter<Event>();
 @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() className = '';
   @Input() size: 'sm' | 'md' | 'lg' = 'md';
  get computedClass() {
    const sizeClass = this.size ? `btn-${this.size}` : 'btn-md';
    return `btn ${sizeClass} ${this.className}`.trim();
  }

}
