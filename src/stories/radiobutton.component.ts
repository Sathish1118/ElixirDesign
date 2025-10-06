import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'storybook-radio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-check">
      <input
        class="form-check-input"
        type="radio"
        [ngClass]="cssclass"
        [id]="id"
        [name]="name"
        [checked]="checked"
        [disabled]="disabled"
        (change)="onChange($event)">
      <label class="form-check-label" [for]="id">
        {{ label }}
      </label>
    </div>
  `
})
export class RadioButtonComponent {
  @Input() checked = false; // already default false
  @Input() disabled = false;
  @Input() cssclass = '';
  @Input() label = 'Radio';
  @Input() name = 'radioGroup'; 
  @Input() id = Math.random().toString(36).substring(2);

  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const isChecked = !!input.checked;
    this.checked = isChecked;
    this.checkedChange.emit(isChecked);
  }
}
