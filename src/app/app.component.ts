import { Component,TemplateRef,ViewChild } from '@angular/core';
import { TableColumn } from '../stories/table.component';
// import { TableColumn } from './table.component';
import { TableAction } from '../stories/table.component';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AlertService } from '../stories/alert.service';
import  { filterData } from '../stories/search.utils';
import { Tab } from '../stories/tab.component';
import { checkbox } from '../stories/table.stories';
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
  { type: 'edit',iconClass: 'fa-solid fa-pen-to-square' },
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

onSubmit() {
  if (this.userForm.valid) {
    console.log(this.userForm.value);
  } else {
    this.userForm.markAllAsTouched(); 
  }
}
isInvalid(controlName: string) {
  const control = this.userForm.get(controlName);
  return control && (control.touched || control.dirty) && control.invalid;
}
isvalid(controlName: string): boolean {
  const control = this.userForm.get(controlName);
  return !!control && control.touched && control.invalid;
}



  submit(){
    alert(this.inputValue)
  this.alertService.show({ type: 'primary', message: 'Operation Successful!' });
  }
    userForm!: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService) {
        this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // gender: [''],
      normal: ['',Validators.required],
      badge: ['',Validators.required],
      radio: ['',Validators.required],
      number: ['',Validators.required],
  checkbox: [[], this.minSelectedCheckboxes(1)]
      // address: ['']
    });
  }
   submit1() {
  this.alertService.show({ type: 'expand-success', message: 'Something went wrong!' });
  }
minSelectedCheckboxes(min = 1) {
  return (control: FormControl) => {
    const val = control.value;
    if (Array.isArray(val) && val.length >= min) return null; // valid
    return { required: true }; // invalid
  }
}
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

// toggleTheme() {
//   document.body.classList.toggle("dark-theme");
// }
salesData = [
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 1', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 2', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 3', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 1', amount: 1 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 2', amount: 1 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 3', amount: 1 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 1', amount: 500 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 2', amount: 500 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 3', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 4', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 5', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 6', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 7', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 8', salesType: 'Sales A', division: 'Division 3', amount: 500 },
    { businessUnit: 'Business Unit 9', salesType: 'Sales A', division: 'Division 3', amount: 500 },

];

// subash files

//  title = 'elixirdesign';
  today = new Date();
  selectedDate = new Date(2025, 8, 1); // Sept 1, 2025
  currentUser = { name: 'John Doe', role: 'Admin' };

  backendValue: number = 0;

  categoryChips = [
    { category: 'Sales', label: 'Sales' },
    { category: 'Financial', label: 'Financial' },
    { category: 'Business', label: 'Business' },
    { category: 'Revenue', label: 'Revenue' },
    { category: 'Technology', label: 'Technology' },
  ];

  queryChips = [
    { status: 'inprogress', label: 'In Progress' },
    { status: 'resolution', label: 'Resolved' },
    { status: 'raised', label: 'Raised' }
  ];

  files: { name: string; size: string; progress: number; status: 'default' | 'progress' | 'completed' }[] = [];

 ngOnInit(): void {
    // simulate API call
    setTimeout(() => {
      this.backendValue = 3;
    }, 1000);
      this.onFileSelected 
  }

  handleLogin(event: Event) { console.log('Login clicked', event); }
  handleLogout(event: Event) { console.log('Logout clicked', event); }
  handleCreate(event: Event) { console.log('Create Account clicked', event); }

  onFileSelected(event: any) {
    if (!event || !event.target || !event.target.files || event.target.files.length === 0) return;

    const selectedFile = event.target.files[0];

    // initialize with default design
    const fileObj = {
      name: selectedFile.name,
      size: (selectedFile.size / 1024 / 1024).toFixed(2) + ' Mb',
      progress: 0,
      status: 'default' as 'default' | 'progress' | 'completed'
    };

    this.files.push(fileObj);

    // Show default design for 1 second before starting upload
    setTimeout(() => {
      fileObj.status = 'progress';
      const interval = setInterval(() => {
        if (fileObj.progress >= 100) {
          fileObj.progress = 100;
          fileObj.status = 'completed';
          clearInterval(interval);
        } else {
          fileObj.progress += 10;
        }
      }, 300);
    }, 1000);
  }
//draganddrop
  filesList = [
  { title: 'Document 1', desc: 'First file description' },
  { title: 'Document 2', desc: 'Second file description' },
  { title: 'Document 3', desc: 'Third file description' },
];
//sort
sortOptions = [
  { title: 'Recent' },
  { title: 'High to Low' },
  { title: 'Low to High' },
];

onSortChange(sort: string) {
  console.log('Selected sort option:', sort);
  // apply your sorting logic here
}

//bar chart
  // 👉 Bar Chart Data
  barChartData = [
    { label: '2021', value: 85, color: '#1e88e5' },
    { label: '2022', value: 95, color: '#43a047' },
    { label: '2023', value: 110, color: '#fbc02d' },
    { label: '2024', value: 95, color: '#e53935' },
    { label: '2025', value: 85, color: '#8e24aa' }
  ];

  // 👉 Line Chart Data
  lineChartData = [
    { label: '2021', value: 50, color: '#42a5f5' },
    { label: '2022', value: 95, color: '#ef5350' },
    { label: '2023', value: 75, color: '#66bb6a' },
    { label: '2024', value: 60, color: '#ffca28' },
    { label: '2025', value: 90, color: '#ab47bc' }
  ];

  // 👉 Pie Chart Data
  pieChartData = [
    { label: 'Product A', value: 35, color: '#42a5f5' },
    { label: 'Product B', value: 25, color: '#66bb6a' },
    { label: 'Product C', value: 20, color: '#ef5350' },
    { label: 'Product D', value: 20, color: '#ffca28' }
  ];

  // 👉 Radial Bar Chart Data
  radialData = [
    { label: 'Progress 1', value: 70, color: '#8e24aa' },
    { label: 'Progress 2', value: 45, color: '#1e88e5' },
    { label: 'Progress 3', value: 90, color: '#43a047' }
  ];

  boxPlotData = [
  { label: '2021', value: [60, 80, 100, 120, 150], color: '#ffa726' },
  { label: '2022', value: [70, 90, 110, 130, 160], color: '#ffa726' },
  { label: '2023', value: [65, 85, 105, 125, 155], color: '#ffa726' },
  { label: '2024', value: [50, 70, 90, 110, 140],  color: '#ffa726' }
];
  donutchart = [
  { label: '2021', value: [60, 80, 100, 120, 150], color: '#ffa726' },
  { label: '2022', value: [70, 90, 110, 130, 160], color: '#ffa726' },
  { label: '2023', value: [65, 85, 105, 125, 155], color: '#ffa726' },
  { label: '2024', value: [50, 70, 90, 110, 140],  color: '#ffa726' }
];
  isDark = false; 

toggleTheme() {
  this.isDark = !this.isDark;
  document.body.classList.toggle("dark-theme");
}
 bentoData = [
    { icon: 'fa-solid fa-user', title: ' Profile settings',  },
    { icon: 'fa-solid fa-gear', title: 'Settings',  },
    { icon: 'fa-solid fa-bell', title: 'Notifications', },
        { icon: 'fa-solid fa-user', title: 'Profile',  },
    { icon: 'fa-solid fa-gear', title: 'Settings',  },
    { icon: 'fa-solid fa-bell', title: 'Notifications', },

        { icon: 'fa-solid fa-user', title: 'Profile',  },
    { icon: 'fa-solid fa-gear', title: 'Settings',  },
    { icon: 'fa-solid fa-bell', title: 'Notifications', },
  ];

  bentoHorizontals= [
    { icon: 'fa fa-envelope', title: 'Mail', },
    { icon: 'fa fa-comments', title: 'Chat',  }
  ];
}
