import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductPage } from './add-product.page';

describe('AddProductPage', () => {
  let component: AddProductPage;
  let fixture: ComponentFixture<AddProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
