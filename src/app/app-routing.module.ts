import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestbreadcrumbpageComponent } from './component/testbreadcrumbpage/testbreadcrumbpage.component';
import { TestcomponentComponent } from './component/testcomponent/testcomponent.component';
import { ListcomponentComponent } from './component/listcomponent/listcomponent.component';

const routes: Routes = [
  { path: 'breadcrumb', component: TestbreadcrumbpageComponent, data: { breadcrumb: 'Breadcrumb' } },
  { path: 'Testfile', component: TestcomponentComponent, data: { breadcrumb: 'Testfile' } },
  { path: 'List', component: ListcomponentComponent, data: { breadcrumb: 'List' } },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
