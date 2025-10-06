import { Component,TemplateRef,ViewChild } from '@angular/core';
import { TableColumn } from '../stories/table.component';
// import { TableColumn } from './table.component';
import { TableAction } from '../stories/table.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../stories/alert.service';
import  { filterData } from '../stories/search.utils';
import { Tab } from '../stories/tab.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
   @ViewChild('homeTemplate') homeTpl!: TemplateRef<any>;
  @ViewChild('profileTemplate') profileTpl!: TemplateRef<any>;
  @ViewChild('settingsTemplate') settingsTpl!: TemplateRef<any>;
  title = 'elixirdesign';
  inputValue: any;
  // form!:FormGroup;
   errorMsg: string = '';
   errorMsgexpand:string='';
  columns: TableColumn[] = [
    { header: 'Name', accessor: 'name',className:'text-primary fw-bold',underline: true },
    { header: 'Section', accessor: 'section' },
    { header: 'Module', accessor: 'module' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status'},
    { header: 'Updated On', accessor: 'updatedOn',underline: true },
  ];
  accordionItems = [
  { title: 'User Info', content: 'Username, Email, Phone...' },
];
    columns1: TableColumn[] = [
   { header: '', accessor:'',isCheckbox: true }, 
    { header: 'Name', accessor: 'name',className:'text-primary fw-bold',underline: true },
    { header: 'Section', accessor: 'section' },
    { header: 'Module', accessor: 'module' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status'},
    { header: 'Updated On', accessor: 'updatedOn',underline: true },
  ];
  
actions: TableAction[] = [
  { type: 'edit',iconClass: 'fas fa-edit' },
];
 tableData = [
  { name: 'Offer Letter', section: 'Candidate Letters', module: 'Onboarding', category: 'Welcome Letter', status: 'Enabled', updatedOn: '03/02/2025'},
  { name: 'Welcome Letter', section: 'HR Letters', module: 'Onboarding', category: 'Welcome', status: 'Enabled', updatedOn: '04/02/2025'},
   { name: 'Offer Letter', section: 'Candidate Letters', module: 'Onboarding', category: 'Welcome Letter', status: 'Enabled', updatedOn: '03/02/2025'},
  { name: 'Welcome Letter', section: 'HR Letters', module: 'Onboarding', category: 'Welcome', status: 'Enabled', updatedOn: '04/02/2025'},
  
];
  filteredData: any[]=[];
  tabs: any;
  handleAction(event: { action: TableAction; row: any }) {
    console.log('Clicked action:', event.action, 'on row:', event.row);
    alert ('dsasd')
  }
  submit(){
    alert(this.inputValue)
  this.alertService.show({ type: 'primary', message: 'Operation Successful!' });
  }
  constructor(private fb: FormBuilder, private alertService: AlertService) {
  }
   submit1() {
  this.alertService.show({ type: 'expand-success', message: 'Something went wrong!' });
  }
//  defaultChecked = false;
//   checkedExample = true;
//   disabledExample = false;
//   validExample = false;
//   invalidExample = false;
  checkedChange(value: boolean) {
  console.log('Radio checked:', value);
}
show = false;
onConfirm() {
  console.log('Confirmed!');
  this.show = false;
}
onClose() {
  console.log('Modal closed');
}
onSearch(query: string) {
  this.filteredData = filterData(this.tableData, query);
}
dropdownOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4','Option 4','Option 4','Option 4','Option 4','Option 4','Option 4','Option 4','Option 4'];
dropdownList = [
  { label: 'Option', value: 'Option', count: '66' },
  { label: 'Option 2', value: 'Option 2', count: '66' },
  { label: 'Option 3', value: 'Option 3', count: '67567567' },
];
selectedValue: any = null;
myTabs: Tab[] = [];
myTabs1: Tab[] = [];
ngAfterViewInit() {
  setTimeout(() => {
    this.myTabs = [
      { label: 'Home', template: this.homeTpl },
      { label: 'Profile', template: this.profileTpl },
      { label: 'Settings', template: this.settingsTpl },
    ];
    this.myTabs[1].badge = 9;

    this.myTabs1 = [
      { label: 'Home', template: this.homeTpl },
      { label: 'Profile', template: this.profileTpl },
    ];
  });
}
  formula: string = '';
  col1: number = 10;
  col2: number = 5;
  result: number | null = null;
calculate() {
  if(!this.formula) return;

  let expr = this.formula
    .replace(/value1/gi, this.col1.toString())
    .replace(/value2/gi, this.col2.toString())
    .replace(/plus/gi, '+')
    .replace(/minus/gi, '-')
    .replace(/times/gi, '*')
    .replace(/divide/gi, '/');

  // Handle sum()
// Handle sum()
expr = expr.replace(/sum\((.*?)\)/gi, (_, content) => {
  const parts = content.trim().split(/\s+/).map((p: string) => {
    // Column references
    if (/^Column1$/i.test(p)) return this.col1;
    if (/^Column2$/i.test(p)) return this.col2;
    // If manual number, use Number()
    if (!isNaN(Number(p))) return Number(p);
    return 0;
  });
  return parts.join(' + ');
});


  expr = expr.trim();
  if(/[\+\-\*\/]$/.test(expr)) expr = expr.slice(0, -1);

  console.log('Converted formula:', expr);
  // this.result = eval(expr);
  this.result = new Function('return ' + expr)();
  console.log('Result:', this.result);
}

toggleTheme() {
  document.body.classList.toggle("dark-theme");
}


}
