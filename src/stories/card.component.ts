import { Component,Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'storybook-card',
  imports: [CommonModule],
 standalone: true,
  template: `
  <div class="card-for-imag" [ngClass]="{ 'card--with-button': showActions }">
      <img class="card__image" [src]="image" alt="card image" />

      <div class="card__content">
        <h3 class="card__heading">{{ heading }}</h3>
        <p class="card__body">{{ content }}</p>
      </div>

      <div class="card__actions" *ngIf="showActions">
        <button class="card__btn--cancel">{{ cancelLabel }}</button>
        <button class="card__btn--submit">{{ submitLabel }}</button>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() heading: string = 'Default Heading';
  @Input() content: string = 'Default content text goes here.';
  @Input() image: string = 'https://via.placeholder.com/320x180';

  /** Optional buttons */
  @Input() showActions: boolean = false;
  @Input() submitLabel: string = 'Submit';
  @Input() cancelLabel: string = 'Cancel';
}
