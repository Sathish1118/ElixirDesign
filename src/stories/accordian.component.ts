import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="accordion accordion-light" id="accordionExample">
    <div class="accordion-item" *ngFor="let item of items; let i = index">
      <h2 class="accordion-header" [id]="'heading' + i">
        <button class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse"
                [attr.data-bs-target]="'#collapse' + i"
                aria-expanded="false"
                [attr.aria-controls]="'collapse' + i">
          {{ item.title }}
        </button>
      </h2>
      <div [id]="'collapse' + i"
           class="accordion-collapse collapse"
           [attr.aria-labelledby]="'heading' + i"
           data-bs-parent="#accordionExample">
        <div class="accordion-body">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
  `,
    styles: [`
   .accordion .accordion-button:focus,
.accordion .accordion-button:active {
  box-shadow: none;      
}
`]
})
export class AccordionComponent {
  @Input() items: { title: string, content: string }[] = [];
}
