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
import { LinkComponent } from '../stories/link.component';
import { ButtonIconComponent } from '../stories/button-icon.component';
import { LeftNavComponent } from '../stories/left-nav.component';
import { HeaderComponent } from '../stories/header.component';
import { CalendarComponent } from '../stories/calendar.component';
import { DropdownlistComponent } from '../stories/dropdown-list.component';
import { MenuButtonComponent } from '../stories/Menu-Button-Component';
import { HyperlinkValueComponent } from '../stories/hyperlinkvalue.component';
import { BreadcrumbComponent } from '../stories/breadcrumb.component';
import { TestcomponentComponent } from './component/testcomponent/testcomponent.component';
import { TestbreadcrumbpageComponent } from './component/testbreadcrumbpage/testbreadcrumbpage.component';
import { ListcomponentComponent } from './component/listcomponent/listcomponent.component';
import { ChipComponent } from '../stories/chip.component';
import { FiniteChipComponent } from '../stories/FiniteChipComponent';
import { ProgressUploadComponent } from '../stories/progress-upload.component';
import { DragDropComponent } from '../stories/drag-drop.component';
import { SortComponent } from '../stories/sort.component';
import { CardComponent } from '../stories/card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsComponent } from '../stories/charts.component';
import { SummaryPointComponent } from '../stories/summary-point.component';
import { BentoComponent } from '../stories/bento.component';


@NgModule({
  declarations: [
    AppComponent,
    TestcomponentComponent,
    TestbreadcrumbpageComponent,
    ListcomponentComponent,
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
    StorybookPivotTableComponent,

    ButtonComponent,
    LinkComponent,
    ButtonIconComponent,
    LeftNavComponent,
    HeaderComponent,
    CalendarComponent,
    DropdownlistComponent,
    MenuButtonComponent,
    HyperlinkValueComponent,
    BreadcrumbComponent,
    ChipComponent,
    FiniteChipComponent,
    ProgressUploadComponent,
    DragDropComponent,
    SortComponent,
    CardComponent,
    NgApexchartsModule,
    ChartsComponent,
    SummaryPointComponent,
    BentoComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
