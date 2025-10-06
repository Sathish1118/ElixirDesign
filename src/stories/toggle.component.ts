import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'storybook-toggle-switch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-check form-switch custom-toggle">
      <input 
        class="form-check-input" 
        type="checkbox"   [ngClass]="cssclass" 
        id="flexSwitchCheckDefault"
        [(ngModel)]="checked"   [disabled]="disabled"
        (ngModelChange)="checkedChange.emit($event)">
          <label class="form-check-label" for="flexCheckDefault">
        {{ label }}
      </label>
    </div>
  `,
  styles:`
    `
})
export class ToggleSwitchComponent {
  @Input() checked = false;
  @Input() disabled = false;
@Input() cssclass = '';
  @Input() label = 'Toggle Switch';
  @Output() checkedChange = new EventEmitter<boolean>();
}
