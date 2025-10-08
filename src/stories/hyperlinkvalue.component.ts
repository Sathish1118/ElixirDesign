import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-hyperlink-value',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a href="#" class="hyperlink-value">
      <span class="label">{{ label }}</span>
      <span class="badge">+{{ value }}</span>
    </a>
  `,
})
export class HyperlinkValueComponent {
  @Input() label: string = 'Element';
  @Input() value: number = 0;
}
