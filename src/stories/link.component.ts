// link.component.ts
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-link',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
  [href]="href"
  [ngClass]="computedClass"
  (click)="disabled ? $event.preventDefault() : onClick.emit($event)"
>
  {{ label }}
</a>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class LinkComponent { // ✅ named export
  @Input() label = 'Link';
  @Input() href = '#';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() className = 'link-primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();

//   get computedClass() {
//     const sizeClass = this.size ? `link-${this.size}` : 'link-md';
//     return `${sizeClass} ${this.className}`.trim();
//   }
get computedClass() {
  const sizeClass = this.size ? `link-${this.size}` : 'link-md';
  const disabledClass = this.disabled ? 'link-disabled' : '';
  return `${sizeClass} ${this.className} ${disabledClass}`.trim();
}
  
}
