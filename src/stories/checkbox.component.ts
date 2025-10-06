import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'storybook-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-check custom-checkbox">
      <input
        class="form-check-input"
        type="checkbox"
        [ngClass]="cssclass"
        id="flexCheckDefault"
        [(ngModel)]="checked"
        [disabled]="disabled"
        (ngModelChange)="checkedChange.emit($event)">
      <label class="form-check-label" for="flexCheckDefault">
        {{ label }}
      </label>
    </div>
  `,
  styles: [`
  `]
})
export class CheckboxComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() cssclass = '';
  @Input() label = 'Checkbox';

  @Output() checkedChange = new EventEmitter<boolean>();
}
