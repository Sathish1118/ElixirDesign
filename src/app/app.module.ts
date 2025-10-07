import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from "../stories/button.component";
import { TableComponent } from '../stories/table.component';
import { InputComponent } from '../stories/input.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // <- reactive forms
import { AlertComponent } from '../stories/alert.component';
import { AccordionComponent } from '../stories/accordian.component';
import { ToggleSwitchComponent } from '../stories/toggle.component';
import { CheckboxComponent } from '../stories/checkbox.component';
import { RadioButtonComponent } from '../stories/radiobutton.component';
import { StorybookModalComponent } from '../stories/popup.component';
import { StorybookSearchComponent } from '../stories/search.component';
import {StorybookDropdownComponent} from '../stories/dropdown.component';
import { TooltipComponent } from '../stories/tooltip.component';
import { TabsComponent } from '../stories/tab.component';
import {FormulaComponent} from '../stories/formula.component';
import { StorybookPivotTableComponent } from '../stories/pivot-table.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonComponent,
    TableComponent,
    InputComponent,
    AlertComponent,
    ReactiveFormsModule,
    FormsModule,
    AccordionComponent,
    ToggleSwitchComponent,
    CheckboxComponent,
    RadioButtonComponent,
    StorybookModalComponent,
    StorybookSearchComponent,
    StorybookDropdownComponent,
    TooltipComponent,
    TabsComponent,
    FormulaComponent,
    StorybookPivotTableComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
