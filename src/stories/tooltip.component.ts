import { Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'storybook-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  styles: [`
`]
})
export class TooltipComponent {
  @Input() placement: string = 'top'; 
  constructor(private el: ElementRef) {}
  ngAfterViewInit(): void {
    this.initTooltips();
  }

  initTooltips(): void {
    const elements = this.el.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    elements.forEach((el: HTMLElement) => {
      bootstrap.Tooltip?.getInstance?.(el)?.dispose();
      new bootstrap.Tooltip(el, {
        trigger: 'hover focus',
        placement: this.placement,
        boundary: 'viewport',
        //  container: this.el.nativeElement
      });
    });
  }
}
