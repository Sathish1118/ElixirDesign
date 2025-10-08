import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface BentoItem {
  icon: string; // e.g. "fa-solid fa-user" or an SVG class
  title: string; // short heading shown under the icon
  label?: string; // optional longer label or tooltip
  active?: boolean;
  // optional raw svg markup (preferred for custom SVG icons). If provided, it will be rendered
  // and take precedence over `icon`.
  iconSvg?: string;
}

@Component({
  selector: 'storybook-bento',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bento-default">
  <h6 class="bento-section-title">Modules</h6>
    <div class="bento-grid">
    <div class="bento-module" *ngFor="let module of items" tabindex="0">
      <div class="bento-icon"><i [class]="module.icon"></i></div>
      <div class="bento-title" >{{ module.title }}</div>
      <div class="bento-label">{{ module.label }}</div>
    </div>
  </div>

  <div class="bento-horizontals" *ngIf="horizontals.length">
    <h6 class="bento-section-title">Horizontals</h6>
      <div class="bento-grid">
      <div class="bento-module" *ngFor="let h of horizontals" tabindex="0">
        <div class="bento-icon"><i [class]="h.icon"></i></div>
        <div class="bento-title">{{ h.title }}</div>
        <div class="bento-label">{{ h.label }}</div>
      </div>
    </div>
  </div>
</div>


`,
})
export class BentoComponent {
  @Input() items: BentoItem[] = [];
  @Input() modules: BentoItem[] = [];
  @Input() horizontals: BentoItem[] = [];
  @Input() columns = 3;

  constructor(private sanitizer: DomSanitizer) {}

  sanitize(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg || '');
  }

  get modulesToRender(): BentoItem[] {
    if (this.items?.length && !this.modules?.length) {
      return this.items;
    }
    return this.modules;
  }
  open(title: string) {
    alert(title);
  }
}
