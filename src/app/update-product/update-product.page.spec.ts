import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProductPage } from './update-product.page';

describe('UpdateProductPage', () => {
  let component: UpdateProductPage;
  let fixture: ComponentFixture<UpdateProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
