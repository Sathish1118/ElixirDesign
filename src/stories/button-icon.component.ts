import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'storybook-button-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [ngClass]="computedClass" [disabled]="disabled" (click)="onClick.emit($event)">
      <i [ngClass]="icon" class="btn-icon"></i>
    </button>
  `,
  styleUrls: ['./button-icon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonIconComponent {
  @Input() icon: string = '';      // e.g. 'fa fa-search'
  @Input() disabled = false;
  @Input() className = '';         // pass your btn-primary-icon-* or btn-outline-icon-* classes here

  @Output() onClick = new EventEmitter<Event>();

  get computedClass() {
    return this.className.trim();
  }
}
