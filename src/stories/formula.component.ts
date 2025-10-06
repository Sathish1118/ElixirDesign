import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'storybook-formula',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
      <div class="mt-3 d-flex gap-4">
        <div class="d-flex flex-column gap-2">
          <button class="formulaicon d-flex align-items-center justify-content-center" *ngFor="let o of ops"
                  [class.disabled]="o.disabled"
                  [attr.title]="o.name"
                  (click)="onOpClick(o)"
                  [disabled]="o.disabled">
            <i [class]="o.icon"></i>
          </button>
        </div>

        <div class="form-area" style="flex:1">
          <label class="form-label">Formula *</label>
          <textarea class="form-control"
                 [(ngModel)]="formula"
                 (input)="onInput()"
                 placeholder="Enter Formula" style="resize: none;" rows="2"></textarea>
           <div class="mt-2">
             <div *ngIf="state === 'validate'" class="help fw-bold">Validate Formula</div>
          <div *ngIf="state === 'valid'" class="valid fw-bold"><i class="fa-solid fa-check me-1"></i>Formula Valid</div>
          <div *ngIf="state === 'invalid'" class="invalid fw-bold"><i class="fa-solid fa-circle-info me-1 fw-bold"></i>Invalid</div>
            </div>
         
        </div>
      </div>
  `,
    styles: [`
  
  `]
})
export class FormulaComponent {
    @Input() ops = [
        { name: 'plus', icon: 'fa fa-plus', disabled: false },
        { name: 'minus', icon: 'fa fa-minus', disabled: false },
        { name: 'times', icon: 'fa fa-times', disabled: false },
        { name: 'divide', icon: 'fa fa-divide', disabled: false },
        { name: 'sum', icon: 'fa-solid fa-list', disabled: true }
    ];

    @Input() formula: string = '';
    @Output() formulaChange = new EventEmitter<string>();
    state: 'validate' | 'valid' | 'invalid' | null = null;
    onOpClick(o: any) {
        if (o.disabled) return;
        if (o.name === 'sum') {
            this.formula += (this.formula ? ' ' : '') + 'sum()';
        } else {
            this.formula += (this.formula ? ' ' : '') + o.name;
        }
        this.validate();
        this.formulaChange.emit(this.formula);
    }
    onInput() {
        this.validate();
        this.formulaChange.emit(this.formula);
    }

    validate() {
        if (!this.formula) {
            this.state = 'validate';
            return;
        }
        const hasValidPart = /Column\d+|plus|minus|times|divide|sum\(/i.test(this.formula);
        this.state = hasValidPart ? 'valid' : 'invalid';
    }

}
