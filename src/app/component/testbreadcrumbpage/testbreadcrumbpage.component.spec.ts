import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbreadcrumbpageComponent } from './testbreadcrumbpage.component';

describe('TestbreadcrumbpageComponent', () => {
  let component: TestbreadcrumbpageComponent;
  let fixture: ComponentFixture<TestbreadcrumbpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestbreadcrumbpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestbreadcrumbpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
