import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesPage } from './sales.page';

describe('SalesPage', () => {
  let component: SalesPage;
  let fixture: ComponentFixture<SalesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
