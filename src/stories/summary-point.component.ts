import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-summary-point',
  standalone: true,
  imports: [CommonModule],
  template: `
 <!-- <h4 class="fw-bold" *ngIf="heading">{{ heading }}</h4> -->

<div class="cardpoints">
  <div class="cardpint1">
    <div class="d-flex flex-row align-items-center">
      <div class="col-lg-11">
        <h6 class="m-2">{{ title }}</h6>
      </div>
      <div class="col-lg-1 text-end" *ngIf="showMenu">
        <i class="fa-solid fa-ellipsis-vertical m-2"></i>
      </div>
    </div>

    <div class="m-2 mt-3">
      <h4 class="fw-bold">{{ value }}</h4>
    </div>

    <div class="m-2 ms-2">
      <h6>{{ description }}</h6>
    </div>
  </div>
</div>
  `,
})
export class SummaryPointComponent {
  /** Top heading text */
  // @Input() heading = 'Summary Point';

  /** Card title text */
  @Input() title = 'Employees By Team';

  /** Main numeric value */
  @Input() value: string | number = 43;
  @Input() showMenu: boolean = true;
  /** Description below the value */
  @Input() description = 'Sample Description';
}
