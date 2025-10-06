// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'storybook-input',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   template: `
//   <div class="position-relative">
//     <i *ngIf="iconLeft"
//        [class]="iconLeft"
//        class="position-absolute top-50 start-0 translate-middle-y ms-3"></i>
//     <input
//       [placeholder]="placeholder"
//       class="form-control "
//       [ngClass]="controlSizeClass"
//       [disabled]="disabled"
//       [type]="type"
//       [ngStyle]="inputPaddingStyle"
//       [ngModel]="value"
//       (ngModelChange)="onValueChange($event)"
//     />
//     <i *ngIf="iconRight"
//        [class]="iconRight"
//        class="position-absolute top-50 end-0 translate-middle-y me-3">
//     </i>
//   </div>
//   `
// })
// export class InputComponent {
//   @Input() placeholder: string = '';
//   @Input() size: 'sm' | 'lg' | '' = '';
//   @Input() disabled: boolean = false;
//   @Input() type: string = 'text';
//   @Input() iconLeft?: string;
//   @Input() iconRight?: string;

//   @Input() value: string = '';
//   @Output() valueChange = new EventEmitter<string>();  // important

//   get controlSizeClass() {
//     if (this.size === 'sm') return 'form-control-sm';
//     if (this.size === 'lg') return 'form-control-lg';
//     return '';
//   }

//   get inputPaddingStyle() {
//     const styles: any = {};
//     if (this.iconLeft) styles['padding-left'] = '2.5rem'; 
//     if (this.iconRight) styles['padding-right'] = '2.5rem';
//     return styles;
//   }

//   onValueChange(val: string) {
//     this.value = val;
//     this.valueChange.emit(val);
//   }
// }
// import { Component, Input, forwardRef } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import {
//   ControlValueAccessor,
//   NG_VALUE_ACCESSOR
// } from '@angular/forms';

// @Component({
//   selector: 'storybook-input',
//   standalone: true,
//   imports: [FormsModule, CommonModule],
//   template: `
//     <div class="position-relative">
//        <i *ngIf="iconLeft"
//         [class]="iconLeft"
//         class="position-absolute top-50 start-0 translate-middle-y ms-3"></i>
//       <input
//         class="form-control"
//           [ngClass]="{
//     'red-border': model?.invalid && (model?.touched || model?.dirty),
//     'form-control-sm': size === 'sm',
//     'form-control-lg': size === 'lg'
//   }"
//         [type]="type"
//         [placeholder]="placeholder" 
//         #model="ngModel"  [disabled]="disabled"
//         [(ngModel)]="value"  [ngStyle]="inputPaddingStyle"
//         (input)="handleInput($event)"
//         [required]="required"
//         name="inputField"
//       />
//       <div *ngIf="model?.invalid && (model?.touched || model?.dirty)" class="text-danger mt-1">
//        <i class="fa-solid fa-circle-info me-2"></i>Error
//       </div>
//        <i *ngIf="iconRight"
//       [class]="iconRight"
//        class="position-absolute top-50 end-0 translate-middle-y me-3">
//      </i>
//     </div>
//   `,
//   styles: `
//     .red-border {
//       border: 1px solid red;
//     }
//   `,
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => InputComponent),
//       multi: true
//     }
//   ]
// })
// export class InputComponent implements ControlValueAccessor {
//   @Input() type = 'text';
//   @Input() placeholder = 'Enter value';
//   @Input() required: any;
//   @Input() value: any;
//    @Input() size: 'sm' | 'lg' | '' = '';
//   @Input() iconLeft?: string;
//   @Input() iconRight?: string;
//  @Input() disabled: boolean = false;
//   writeValue(value: any): void {
//     this.value = value;
//   }

//   onChange: any = () => {};
//   onTouched: any = () => {};

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   handleInput(event: any) {
//     const newValue = event.target.value;
//     this.value = newValue;
//     this.onChange(newValue);
//     this.onTouched();
//   }
//     get inputPaddingStyle() {
//     const styles: any = {};
//     if (this.iconLeft) styles['padding-left'] = '2.5rem'; 
//     if (this.iconRight) styles['padding-right'] = '2.5rem';
//     return styles;
//   }
  
//   // get controlSizeClass() {
//   //   if (this.size === 'sm') return 'form-control-sm';
//   //   if (this.size === 'lg') return 'form-control-lg';
//   //   return '';
//   // }
// }
import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'storybook-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="position-relative">
      <i *ngIf="iconLeft"
         [class]="iconLeft"
         class="position-absolute top-50 start-0 translate-middle-y ms-3"></i>
      <input
        [placeholder]="placeholder"
        class="form-control"
        [ngClass]="controlSizeClass"
        [disabled]="disabled"
        [type]="type"
        [ngStyle]="inputPaddingStyle"
        [value]="value"
        (input)="onInput($event)"
      />
      <i *ngIf="iconRight"
         [class]="iconRight"
         class="position-absolute top-50 end-0 translate-middle-y me-3"></i>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() size: 'sm' | 'lg' | '' = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};
  writeValue(val: any): void {
    this.value = val || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInput(event: any) {
    const val = event.target.value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }

  get controlSizeClass() {
    if (this.size === 'sm') return 'form-control-sm';
    if (this.size === 'lg') return 'form-control-lg';
    return '';
  }
  get inputPaddingStyle() {
    const styles: any = {};
    if (this.iconLeft) styles['padding-left'] = '2.5rem';
    if (this.iconRight) styles['padding-right'] = '2.5rem';
    return styles;
  }
}
